import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { IMailProvider } from "./IMailProvider";
import DateProvider from "./implementations/DateProvider";
import EtherealMailProvider from "./implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>("DateProvider", DateProvider);
container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);
