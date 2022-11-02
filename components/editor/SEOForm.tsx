import classnames from 'classnames';
import { ChangeEventHandler, FC, useEffect, useState } from 'react';
import slugify from 'slugify';

export interface SeoResult {
  meta: string;
  slug: string;
  tags: string;
}

interface Props {
  initialValue?: SeoResult;
  title?: string;
  onChange(result: SeoResult): void;
}

const commonInputClasses = `w-full bg-transparent border-2 border-secondary-dark focus:border-primary-dark dark:focus:border-primary rounded transition p-2 text-primary-dark dark:text-primary outline-none pl-2`;

const SEOForm: FC<Props> = ({
  title = '',
  onChange,
  initialValue,
}): JSX.Element => {
  const [values, setValues] = useState({ meta: '', slug: '', tags: '' });

  const { meta, slug, tags } = values;

  const handleOnChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    let { name, value } = target;
    if (name === 'meta') value = value.substring(0, 150);
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange(newValues);
  };

  useEffect(() => {
    const slug = slugify(title, { lower: true, strict: true });
    const newValues = { ...values, slug };
    setValues(newValues);
    onChange(newValues);
  }, [title]);

  useEffect(() => {
    if (initialValue)
      setValues({
        ...initialValue,
        slug: slugify(initialValue.slug, { lower: true, strict: true }),
      });
  }, [initialValue]);

  return (
    <div className="space-y-4">
      <h1 className="text-primary-dark dark:text-primary text-xl font-semibold">
        SEO Section
      </h1>
      <Input
        value={slug}
        name="slug"
        placeholder="slug-goes-here"
        label="Slug:"
        onChange={handleOnChange}
      />
      <Input
        value={tags}
        name="tags"
        placeholder="React, Next.js"
        label="Tags:"
        onChange={handleOnChange}
      />
      <div className="relative">
        <textarea
          name="meta"
          value={meta}
          className={classnames(commonInputClasses, 'text-lg h-20 resize-none')}
          placeholder="Meta description 150 characters will be fine"
          onChange={handleOnChange}
        ></textarea>
        <p className="absolute bottom-3 right-3 text-primary-dark dark:text-primary text-sm">
          {meta.length}/150
        </p>
      </div>
    </div>
  );
};

interface IInput {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<IInput> = ({ name, value, placeholder, label, onChange }) => {
  return (
    <label className="block relative">
      <span className="absolute top-1/2 left-2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary">
        {label}
      </span>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        className={classnames(commonInputClasses, 'italic pl-11')}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default SEOForm;
