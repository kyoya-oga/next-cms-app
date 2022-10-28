import formidable from 'formidable';
import { NextApiHandler } from 'next';
import cloudinary from '../../lib/cloudinary';

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      return uploadNewImage(req, res);
    case 'GET':
      return readAllImages(req, res);
    default:
      return res.status(404).send('Not found');
  }
};

const readAllImages: NextApiHandler = async (req, res) => {
  try {
    const { resources } = await cloudinary.api.resources({
      resource_type: 'image',
      type: 'upload',
      prefix: 'next-cms',
    });

    const images = resources.map(({ secure_url }: any) => {
      return {
        src: secure_url,
      };
    });
    res.json({ images });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
const uploadNewImage: NextApiHandler = async (req, res) => {
  const form = formidable();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const imageFile = files.image as formidable.File;

    try {
      const { secure_url } = await cloudinary.uploader.upload(
        imageFile.filepath,
        {
          folder: 'next-cms',
        }
      );
      res.json({ src: secure_url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
};

export default handler;
