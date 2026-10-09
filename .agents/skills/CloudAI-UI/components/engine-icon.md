# EngineIcon

- **何时用**:后端下发数据库类型字符串、需要按 `name` 渲染引擎图标时。已有 `@cloudai/engine-icon` 时优先安装；资源身份场景用 `EntityIdentity`（内部已消费本 item）。不要并进 `@cloudai/icons`，也不要手搓 SVG。
- **安装**:`npx shadcn@3 add @cloudai/engine-icon`
- **导入**:`import { EngineIcon } from '@/components/ui/engine-icon'`
- **依赖**:无（仅 `react`）
- **导出**:`EngineIcon`、`ENGINE_ICONS`；类型 `EngineIconProps` / `EngineIconName` / `EngineIconGlyph`；以及每枚 glyph 具名导出（如 `EnginePolarDB`）
- **关键 props**:

  | prop       | 类型         | 说明                                                                                          |
  | ---------- | ------------ | --------------------------------------------------------------------------------------------- |
  | `name`     | `string`     | 与后端数据库类型一致，等于 `apps/v3/assets/engine-icons/` 文件名（无 `.svg`），大小写敏感     |
  | `fallback` | `ReactNode?` | 未登记的 name 渲染此项；默认 `null`，不抛错、不告警                                           |
  | 其余       | `svg` props  | 用 `className` 控尺寸（如 `size-4`）；**不要**加 `size` prop。原 fill 保留，`text-*` 不会改色 |

- **最小示例**:

```tsx
<EngineIcon name="PolarDB" className="size-4" />
<EngineIcon name={engineType} className="size-8" fallback={<Database className="size-8" />} />
import { EnginePolarDB } from "@/components/ui/engine-icon"
<EnginePolarDB className="size-4" />
```

- **体积**:`<EngineIcon>` 内部静态引用全部 glyph，用了出口 A 会打包 53 枚（保留原 fill 的多色 SVG）。只要少数几枚时走出口 B 具名 import。
- **再生**:改 `apps/v3/assets/engine-icons/*.svg` 后手动跑 `node tools/generate-engine-icons.ts`（不进 npm script）。源 SVG 不分发。
- **name 清单**（53）：

| `name`          | 具名导出              | `name`              | 具名导出                 |
| --------------- | --------------------- | ------------------- | ------------------------ |
| `Amazon-S3`     | `EngineAmazonS3`      | `analyticdb`        | `EngineAnalyticdb`       |
| `AWSS3`         | `EngineAWSS3`         | `bigquery`          | `EngineBigquery`         |
| `Cassandra`     | `EngineCassandra`     | `ClickHouse`        | `EngineClickHouse`       |
| `dameng`        | `EngineDameng`        | `das`               | `EngineDas`              |
| `DB2`           | `EngineDB2`           | `dbaas`             | `EngineDbaas`            |
| `dbaudit`       | `EngineDbaudit`       | `dbes`              | `EngineDbes`             |
| `DBS`           | `EngineDBS`           | `dms`               | `EngineDms`              |
| `drds`          | `EngineDrds`          | `dts`               | `EngineDts`              |
| `DuckDB`        | `EngineDuckDB`        | `ECS`               | `EngineECS`              |
| `ElasticSearch` | `EngineElasticSearch` | `exclusive-cluster` | `EngineExclusiveCluster` |
| `gds`           | `EngineGds`           | `HBase`             | `EngineHBase`            |
| `Hive`          | `EngineHive`          | `Hologres`          | `EngineHologres`         |
| `Impala`        | `EngineImpala`        | `Lindorm`           | `EngineLindorm`          |
| `mariadb`       | `EngineMariadb`       | `MaxCompute`        | `EngineMaxCompute`       |
| `Memcac`        | `EngineMemcac`        | `MongoDB`           | `EngineMongoDB`          |
| `mysql`         | `EngineMysql`         | `OceanBase`         | `EngineOceanBase`        |
| `odps`          | `EngineOdps`          | `openanalytics`     | `EngineOpenanalytics`    |
| `openGauss`     | `EngineOpenGauss`     | `Oracle`            | `EngineOracle`           |
| `OSS`           | `EngineOSS`           | `OSShucang`         | `EngineOSShucang`        |
| `OTS`           | `EngineOTS`           | `paas`              | `EnginePaas`             |
| `PolarDB`       | `EnginePolarDB`       | `PostgreSQL`        | `EnginePostgreSQL`       |
| `ppas`          | `EnginePpas`          | `rds-pg`            | `EngineRdsPg`            |
| `rds-sqlserver` | `EngineRdsSqlserver`  | `Redis`             | `EngineRedis`            |
| `RestAPI`       | `EngineRestAPI`       | `S3hucang`          | `EngineS3hucang`         |
| `SelectDB`      | `EngineSelectDB`      | `sls`               | `EngineSls`              |
| `SQLServer`     | `EngineSQLServer`     | `StarRocks`         | `EngineStarRocks`        |
| `tair`          | `EngineTair`          |                     |                          |

- **约束**:`name` 不要自行 kebab / 小写（`PolarDB` 不能写成 `polardb`）。包里没有的私有引擎走 `EntityIdentity` 的 `engines` overlay，不要改本表。**完整形态见 Storybook `CloudAI UI/Console/EngineIcon 引擎图标`**。
