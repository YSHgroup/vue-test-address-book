import { boot } from 'quasar/wrappers';
import pinia from 'src/store/store';

export default boot(({ app }) => {
  app.use(pinia);
});