import {resolve} from 'path';
import {schist} from '../src/index.mjs';

/**
 * @type {import('../index').SchistConfig}
 */
const config = {
  path: resolve('.', 'test')
};

schist(config)
  .run()
  .catch(e => console.error(e));
