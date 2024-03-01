'use client';

import Button, { propRenderOptions } from '@/components/Button';
import { useEffect, useState } from 'react';
import { LiveEditor, LivePreview, LiveProvider } from 'react-live';

export interface PropRenderOption {
  propName: string;
  type: 'select' | 'textInput' | 'checkbox';
  initialValue: any;
  options?: string[];
}

export default function Home() {
  const [code, setCode] = useState('');
  const [componentProps, setComponentProps] = useState(
    propRenderOptions.reduce(
      (acc, prop) => ({
        ...acc,
        [prop.propName]: prop.initialValue,
      }),
      {}
    )
  );

  useEffect(() => {
    const propsString = Object.entries(componentProps)
      .map(
        ([key, value]) =>
          `${key}=${
            typeof value === 'string' ? `"${value}"` : `{${value}}`
          }`
      )
      .join(' ');

    setCode(`<Button ${propsString} />`);
  }, [componentProps]);

  const handlePropChange = (propName: string, value: any): void => {
    setComponentProps({ ...componentProps, [propName]: value });
  };

  const inputs = propRenderOptions.map((prop) => {
    switch (prop.type) {
      case 'textInput':
        return (
          <div key={prop.propName} className="pb-4">
            <label id={prop.propName} className="pr-1">
              {prop.propName}
            </label>

            <input
              aria-labelledby={prop.propName}
              onChange={(e) =>
                handlePropChange(prop.propName, e.target.value)
              }
              type="text"
              value={(componentProps as any)[prop.propName] || ''}
            />
          </div>
        );
      case 'checkbox':
        return (
          <div key={prop.propName} className="pb-4">
            <label id={prop.propName} className="pr-1">
              {prop.propName}
            </label>

            <input
              aria-labelledby={prop.propName}
              onChange={(e) => {
                handlePropChange(prop.propName, e.target.checked);
              }}
              type="checkbox"
              value={(componentProps as any)[prop.propName]}
            />
          </div>
        );
      case 'select':
        return (
          <div key={prop.propName} className="pb-4">
            <label id={prop.propName} className="pr-1">
              {prop.propName}
            </label>

            <select
              aria-labelledby={prop.propName}
              onChange={(e) =>
                handlePropChange(prop.propName, e.target.value)
              }
              value={(componentProps as any)[prop.propName] || ''}
            >
              {prop.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <LiveProvider code={code} scope={{ Button }}>
        <div className="pb-4">
          <LivePreview />
        </div>

        <div className="pb-4">
          <LiveEditor disabled />
        </div>
      </LiveProvider>

      <form>{inputs}</form>
    </main>
  );
}
