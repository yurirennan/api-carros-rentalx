import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { IMailProvider } from "./IMailProvider";
import DateProvider from "./implementations/DateProvider";
import EtherealMailProvider from "./implementations/EtherealMailProvider";
import LocalStorageProvider from "./implementations/LocalStorageProvider";
import S3StorageProvider from "./implementations/S3StorageProvider";
import { IStorageProvider } from "./IStorageProvider";

container.registerSingleton<IDateProvider>("DateProvider", DateProvider);
container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

const storageLocation = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  storageLocation[process.env.StorageProvider]
);
