import React, { ReactNode, useState, useEffect } from 'react';
import { Loader } from 'components';

interface Props<R> {
  /**
   * Children is likely to be rendered only after spinner has been removed
   * (To prevent rendering when data is not fetched, for instance).
   * That's why children needs to be typeof function
   */
  children: (response: R) => ReactNode;

  className?: string;
  containerClassName?: string;

  /**
   * Async function, that needs to be resolved to show / hide spinner
   */
  resolve: () => Promise<R>;

  delay?: number;
}

/**
 * Renders Spinner instead of children when necessary.
 * Can handle promise value to decide render Spinner or not
 */
export default function SpinnerView<R = any>(props: Props<R>) {
  const [isVisible, setIsVisible] = useState(true);
  const [response, setResponse] = useState<R>();
  const { resolve, children, delay = 0, ...rest } = props;

  useEffect(
    () => {
      resolve().then((response) => {
        setResponse(response);
        setTimeout(() => setIsVisible(false), delay);
      });
    },
    [resolve, delay],
  );

  return (
    <>
      {isVisible ? <Loader {...rest} /> : (
        children(response!)
      )}
    </>
  );
}
