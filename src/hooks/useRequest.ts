import { useCallback, useState } from "react";
import useMount from "./useMount";

interface IOptions {
  params: Record<string, string>;
  manual?: boolean;
  onSuccess?: (res: unknown) => void;
  onError?: (err: unknown) => void;
}

/**
 * 1 實現組建初始化，發送請求獲取數據
 * 2 手動觸發請求
 * @param service
 * @param params
 * @returns
 */

const useRequest = (
  service: (params: Record<string, string>) => Promise<unknown>,
  options: IOptions
) => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);

  const init = useCallback(
    (curParams: Record<string, string>) => {
      setLoading(true);
      return service(curParams)
        .then((res) => {
          setData(res);
          setLoading(false);
          if (options.onSuccess) {
            options.onSuccess(res);
          }
        })
        .catch((err) => {
          setLoading(false);
          if (options.onError) {
            options.onError(err);
          }
        });
    },
    [service]
  );

  useMount(() => {
    if (!options.manual) {
      init(options.params);
    }
  });

  const run = (runParams: Record<string, string>) => init(runParams);

  return [loading, data, run];
};

export default useRequest;
