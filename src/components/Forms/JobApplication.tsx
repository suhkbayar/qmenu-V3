import React, { useState } from 'react';
import Loader from '../Loader/Loader';
import { CgSpinner } from 'react-icons/cg';

type Props = {
  structure: any;
  onSubmit: (formData: any) => void;
  loading: boolean;
};

const Index = ({ onSubmit, structure, loading }: Props) => {
  const [formValues, setFormValues] = useState(() => {
    const initialValues = {};
    if (structure) {
      Object?.keys(structure).forEach((key) => {
        if (Array.isArray(structure[key])) {
          initialValues[key] = structure[key][0];
        } else {
          initialValues[key] = '';
        }
      });
    }
    return initialValues;
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  if (!structure) return <Loader />;
  return (
    <>
      <form className="w-full grid  place-items-center  py-5 px-8" onSubmit={handleSubmit}>
        {Object?.keys(structure).map((key) => (
          <div key={key} className="inline-grid w-full ">
            <label className="text-gray-700 font-normal text-sm  font-bold py-2 dark:text-white">{key}</label>
            {Array.isArray(structure[key]) ? (
              <select
                className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
                name={key}
                value={formValues[key] || ''}
                onChange={handleChange}
              >
                {structure[key].map((optionValue) => (
                  <option key={optionValue} defaultValue={optionValue} value={optionValue}>
                    {optionValue}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
                autoFocus
                required
                type="text"
                name={key}
                value={formValues[key] || ''}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <div className="flex items-center justify-between mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-40  flex place-content-center place-items-center  rounded-lg px-4 py-2  md: px-5 py-3 bg-current text-blue-100 hover:bg-current duration-300"
          >
            {loading && <CgSpinner className="text-lg text-white mr-1 animate-spin" />}
            Илгээх
          </button>
        </div>
      </form>
    </>
  );
};

export default Index;
