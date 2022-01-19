/**
 *
 * Initializer
 *
 */

import { useEffect, useRef } from 'react';
import pluginId from '../../pluginId';

function Initializer({ setPlugin }) {
  const ref = useRef();
  ref.current = setPlugin;

  useEffect(() => {
    ref.current(pluginId);
  }, []);

  return null;
}

export default Initializer;
