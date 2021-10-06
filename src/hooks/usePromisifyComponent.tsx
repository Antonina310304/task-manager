import {
  useCallback, useState,
} from 'react';
import { RejectProps, ResolveProps } from '../types';

interface PromiseHandlersInterface {
  onResolve?: ResolveProps
  onReject?: RejectProps;
}

function usePromisifyComponent(
  callback: (resolve: ResolveProps, reject: RejectProps, opened: boolean) => any,
  handlers: PromiseHandlersInterface,
  deps: any[],
) {
  const [opened, setOpen] = useState(false);

  const innerCallback = useCallback(callback, [callback, opened, ...deps]);
  const run = useCallback(() => setOpen(true), [setOpen]);

  const onClose = useCallback(() => {
    setOpen(false);
    if (handlers.onReject) {
      handlers.onReject();
    }
  }, [handlers]);

  const onResolve = useCallback(
    (data) => {
      setOpen(false);
      return handlers.onResolve ? handlers.onResolve(data) : null;
    },
    [handlers],
  );

  return [innerCallback(onResolve, onClose, opened), run];
}

export default usePromisifyComponent;
