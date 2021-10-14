import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateImagesCar1634228430897 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "images_cars",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "car_id",
            type: "uuid",
          },
          {
            name: "image_name",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKImageCar",
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            columnNames: ["car_id"],
            onUpdate: "SET NULL",
            onDelete: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("images_cars");
  }
}
