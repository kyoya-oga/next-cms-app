import formidable from 'formidable';
import { NextApiHandler } from 'next';
import cloudinary from '../../lib/cloudinary';
import { isAdmin } from '../../lib/utils';

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
    const admin = await isAdmin(req, res);
    if (!admin) return res.status(401).json({ error: 'Unauthorized' });

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
  try {
    const admin = await isAdmin(req, res);
    if (!admin) return res.status(401).json({ error: 'Unauthorized' });

    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      const imageFile = files.image as formidable.File;

      const { secure_url } = await cloudinary.uploader.upload(
        imageFile.filepath,
        {
          folder: 'next-cms',
        }
      );
      res.json({ src: secure_url });
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
