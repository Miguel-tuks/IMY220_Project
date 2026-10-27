import { useState } from 'react';

function ImageInput({ id, label, value, onChange, required = false, previewClass = 'aspect-video w-full' }) {
  const [error, setError] = useState('');

  const handleFile = (event) => {
    const file = event.target.files[0];
    setError('');

    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be smaller than 2 MB');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <input
        id={id}
        className="input file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:bg-safelight file:px-3 file:py-1.5 file:font-mono file:text-xs file:uppercase file:tracking-[0.15em] file:text-paper"
        type="file"
        accept="image/*"
        onChange={handleFile}
        required={required}
      />
      <p className="error">{error}</p>
      {value && <img src={value} alt={label + ' preview'} className={previewClass + ' mt-3 border border-edge object-cover'} />}
    </div>
  );
}

export default ImageInput;