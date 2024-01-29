import { useEffect } from "react";

function useAsyncEffect(acb, deps) {
  useEffect(() => {
    (async () => {
      await acb();
    })();
  }, deps);
}

export default useAsyncEffect;
