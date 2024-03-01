import { PropRenderOption } from '@/app/page';
import { FC } from 'react';

interface Props {
  bold?: boolean;
  text: string;
  palette: 'blue' | 'red' | 'green';
}

const backgroundColors = {
  red: {
    default: 'bg-red-500',
    hover: 'hover:bg-red-700',
  },
  blue: {
    default: 'bg-blue-500',
    hover: 'hover:bg-blue-700',
  },
  green: {
    default: 'bg-green-500',
    hover: 'hover:bg-green-700',
  },
};

const Button: FC<Props> = ({ text, bold, palette }) => {
  return (
    <button
      className={`
        ${bold && 'font-bold'}
        ${backgroundColors[palette].default}
        ${backgroundColors[palette].hover}
        text-white
        py-2
        px-4
        rounded
      `}
    >
      {text}
    </button>
  );
};

export default Button;

export const propRenderOptions: PropRenderOption[] = [
  {
    propName: 'text',
    type: 'textInput',
    initialValue: 'Submit',
  },
  {
    propName: 'bold',
    type: 'checkbox',
    initialValue: false,
  },
  {
    propName: 'palette',
    type: 'select',
    initialValue: 'blue',
    options: ['blue', 'red', 'green'],
  },
];
