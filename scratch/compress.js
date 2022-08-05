import { ImagePool } from '@squoosh/lib';
import { cpus } from 'os';

import fs from 'fs/promises';

const imagePool = new ImagePool(cpus().length);

const file = await fs.readFile('./path/to/image.png');
const image = imagePool.ingestImage(file);
