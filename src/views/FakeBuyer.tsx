import { FC, forwardRef, useEffect, useState } from "react";
import {
  SnackbarProvider,
  enqueueSnackbar,
  CustomContentProps,
} from "notistack";
import { random, shuffle } from "radash";
import { isMobile } from "react-device-detect";
import { subMinutes, intlFormatDistance } from "date-fns";
import { fetchAPI } from "../utils/api";

type BaseOrderNotificationProps = {
  name: string;
  location: string;
  date: string;
};

interface OrderNotificationProps
  extends CustomContentProps,
    BaseOrderNotificationProps {}

declare module "notistack" {
  interface VariantOverrides {
    order: BaseOrderNotificationProps;
  }
}

const DISTRICT_IDS = [
  "1101",
  "1102",
  "1103",
  "1104",
  "1105",
  "1106",
  "1107",
  "1108",
  "1109",
  "1110",
  "1111",
  "1112",
  "1113",
  "1114",
  "1115",
  "1116",
  "1117",
  "1118",
  "1171",
  "1172",
  "1173",
  "1174",
  "1175",
  "1201",
  "1202",
  "1203",
  "1204",
  "1205",
  "1206",
  "1207",
  "1208",
  "1209",
  "1210",
  "1211",
  "1212",
  "1213",
  "1214",
  "1215",
  "1216",
  "1217",
  "1218",
  "1219",
  "1220",
  "1221",
  "1222",
  "1223",
  "1224",
  "1225",
  "1271",
  "1272",
  "1273",
  "1274",
  "1275",
  "1276",
  "1277",
  "1278",
  "1301",
  "1302",
  "1303",
  "1304",
  "1305",
  "1306",
  "1307",
  "1308",
  "1309",
  "1310",
  "1311",
  "1312",
  "1371",
  "1372",
  "1373",
  "1374",
  "1375",
  "1376",
  "1377",
  "1401",
  "1402",
  "1403",
  "1404",
  "1405",
  "1406",
  "1407",
  "1408",
  "1409",
  "1410",
  "1471",
  "1473",
  "1501",
  "1502",
  "1503",
  "1504",
  "1505",
  "1506",
  "1507",
  "1508",
  "1509",
  "1571",
  "1572",
  "1601",
  "1602",
  "1603",
  "1604",
  "1605",
  "1606",
  "1607",
  "1608",
  "1609",
  "1610",
  "1611",
  "1612",
  "1613",
  "1671",
  "1672",
  "1673",
  "1674",
  "1701",
  "1702",
  "1703",
  "1704",
  "1705",
  "1706",
  "1707",
  "1708",
  "1709",
  "1771",
  "1801",
  "1802",
  "1803",
  "1804",
  "1805",
  "1806",
  "1807",
  "1808",
  "1809",
  "1810",
  "1811",
  "1812",
  "1813",
  "1871",
  "1872",
  "1901",
  "1902",
  "1903",
  "1904",
  "1905",
  "1906",
  "1971",
  "2101",
  "2102",
  "2103",
  "2104",
  "2105",
  "2171",
  "2172",
  "3101",
  "3171",
  "3172",
  "3173",
  "3174",
  "3175",
  "3201",
  "3202",
  "3203",
  "3204",
  "3205",
  "3206",
  "3207",
  "3208",
  "3209",
  "3210",
  "3211",
  "3212",
  "3213",
  "3214",
  "3215",
  "3216",
  "3217",
  "3218",
  "3271",
  "3272",
  "3273",
  "3274",
  "3275",
  "3276",
  "3277",
  "3278",
  "3279",
  "3301",
  "3302",
  "3303",
  "3304",
  "3305",
  "3306",
  "3307",
  "3308",
  "3309",
  "3310",
  "3311",
  "3312",
  "3313",
  "3314",
  "3315",
  "3316",
  "3317",
  "3318",
  "3319",
  "3320",
  "3321",
  "3322",
  "3323",
  "3324",
  "3325",
  "3326",
  "3327",
  "3328",
  "3329",
  "3371",
  "3372",
  "3373",
  "3374",
  "3375",
  "3376",
  "3401",
  "3402",
  "3403",
  "3404",
  "3471",
  "3501",
  "3502",
  "3503",
  "3504",
  "3505",
  "3506",
  "3507",
  "3508",
  "3509",
  "3510",
  "3511",
  "3512",
  "3513",
  "3514",
  "3515",
  "3516",
  "3517",
  "3518",
  "3519",
  "3520",
  "3521",
  "3522",
  "3523",
  "3524",
  "3525",
  "3526",
  "3527",
  "3528",
  "3529",
  "3571",
  "3572",
  "3573",
  "3574",
  "3575",
  "3576",
  "3577",
  "3578",
  "3579",
  "3601",
  "3602",
  "3603",
  "3604",
  "3671",
  "3672",
  "3673",
  "3674",
  "5101",
  "5102",
  "5103",
  "5104",
  "5105",
  "5106",
  "5107",
  "5108",
  "5171",
  "5201",
  "5202",
  "5203",
  "5204",
  "5205",
  "5206",
  "5207",
  "5208",
  "5271",
  "5272",
  "5301",
  "5302",
  "5303",
  "5304",
  "5305",
  "5306",
  "5307",
  "5308",
  "5309",
  "5310",
  "5311",
  "5312",
  "5313",
  "5314",
  "5315",
  "5316",
  "5317",
  "5318",
  "5319",
  "5320",
  "5321",
  "5371",
  "6101",
  "6102",
  "6103",
  "6104",
  "6105",
  "6106",
  "6107",
  "6108",
  "6109",
  "6110",
  "6111",
  "6112",
  "6171",
  "6172",
  "6201",
  "6202",
  "6203",
  "6204",
  "6205",
  "6206",
  "6207",
  "6208",
  "6209",
  "6210",
  "6211",
  "6212",
  "6213",
  "6271",
  "6301",
  "6302",
  "6303",
  "6304",
  "6305",
  "6306",
  "6307",
  "6308",
  "6309",
  "6310",
  "6311",
  "6371",
  "6372",
  "6401",
  "6402",
  "6403",
  "6404",
  "6405",
  "6409",
  "6411",
  "6471",
  "6472",
  "6474",
  "6501",
  "6502",
  "6503",
  "6504",
  "6571",
  "7101",
  "7102",
  "7103",
  "7104",
  "7105",
  "7106",
  "7107",
  "7108",
  "7109",
  "7110",
  "7111",
  "7171",
  "7172",
  "7173",
  "7174",
  "7201",
  "7202",
  "7203",
  "7204",
  "7205",
  "7206",
  "7207",
  "7208",
  "7209",
  "7210",
  "7211",
  "7212",
  "7271",
  "7301",
  "7302",
  "7303",
  "7304",
  "7305",
  "7306",
  "7307",
  "7308",
  "7309",
  "7310",
  "7311",
  "7312",
  "7313",
  "7314",
  "7315",
  "7316",
  "7317",
  "7318",
  "7322",
  "7325",
  "7326",
  "7371",
  "7372",
  "7373",
  "7401",
  "7402",
  "7403",
  "7404",
  "7405",
  "7406",
  "7407",
  "7408",
  "7409",
  "7410",
  "7411",
  "7412",
  "7413",
  "7414",
  "7415",
  "7471",
  "7472",
  "7501",
  "7502",
  "7503",
  "7504",
  "7505",
  "7571",
  "7601",
  "7602",
  "7603",
  "7604",
  "7605",
  "7606",
  "8101",
  "8102",
  "8103",
  "8104",
  "8105",
  "8106",
  "8107",
  "8108",
  "8109",
  "8171",
  "8172",
  "8201",
  "8202",
  "8203",
  "8204",
  "8205",
  "8206",
  "8207",
  "8208",
  "8271",
  "8272",
  "9101",
  "9102",
  "9103",
  "9104",
  "9105",
  "9106",
  "9107",
  "9108",
  "9109",
  "9110",
  "9111",
  "9112",
  "9171",
  "9401",
  "9402",
  "9403",
  "9404",
  "9408",
  "9409",
  "9410",
  "9411",
  "9412",
  "9413",
  "9414",
  "9415",
  "9416",
  "9417",
  "9418",
  "9419",
  "9420",
  "9426",
  "9427",
  "9428",
  "9429",
  "9430",
  "9431",
  "9432",
  "9433",
  "9434",
  "9435",
  "9436",
  "9471",
];

const OrderNotification = forwardRef<HTMLDivElement, OrderNotificationProps>(
  ({ name, location, date }, ref) => {
    return (
      <div
        ref={ref}
        className="w-full flex bg-white border-4 border-gray-100 rounded-xl shadow-2xl p-3 gap-4 items-center"
      >
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          version="1"
          viewBox="0 0 48 48"
          enableBackground="new 0 0 48 48"
          height="48px"
          width="48px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFC107"
            d="M44,36H30V16c0-1.1,0.9-2,2-2h8c0.6,0,1.2,0.3,1.6,0.8l6,7.7c0.3,0.4,0.4,0.8,0.4,1.2V32 C48,34.2,46.2,36,44,36z"
          />
          <g fill="#9575CD">
            <path d="M8,36h22V13c0-2.2-1.8-4-4-4H4v23C4,34.2,5.8,36,8,36z" />
            <rect y="9" width="10" height="2" />
            <rect y="14" width="10" height="2" />
            <rect y="19" width="10" height="2" />
            <rect y="24" width="10" height="2" />
          </g>
          <g fill="#7E57C2">
            <rect x="4" y="11" width="16" height="2" />
            <rect x="4" y="16" width="12" height="2" />
            <rect x="4" y="21" width="8" height="2" />
            <rect x="4" y="26" width="4" height="2" />
          </g>
          <g fill="#37474F">
            <circle cx="39" cy="36" r="5" />
            <circle cx="16" cy="36" r="5" />
          </g>
          <g fill="#78909C">
            <circle cx="39" cy="36" r="2.5" />
            <circle cx="16" cy="36" r="2.5" />
          </g>
          <path
            fill="#455A64"
            d="M44,26h-3.6c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.2-0.2-0.4-0.3-0.7-0.3H34c-0.6,0-1-0.4-1-1v-6 c0-0.6,0.4-1,1-1h5.5c0.3,0,0.6,0.1,0.8,0.4l4.5,5.4c0.1,0.2,0.2,0.4,0.2,0.6V25C45,25.6,44.6,26,44,26z"
          />
        </svg>

        <div className="flex flex-col ">
          <div className="font-bold">
            {name} dari{" "}
            <span className="capitalize">{location.toLowerCase()}</span>
          </div>
          <div className=" text-black">🔥 baru saja membeli</div>
          <div className="text-sm text-gray-500">{date}</div>
        </div>
      </div>
    );
  }
);

const getNewFormatDistanceDate = () =>
  intlFormatDistance(subMinutes(new Date(), random(0, 450)), new Date(), {
    locale: "id",
  });

export const FakeBuyer: FC = () => {
  const [delay, setDelay] = useState(20);
  const [names, setNames] = useState([]);

  useEffect(() => {
    if (!names.length) return;

    const timeout = setTimeout(() => {
      const [name] = shuffle(names);
      const [regencyId] = shuffle(DISTRICT_IDS);
      const date = getNewFormatDistanceDate();

      fetchAPI(["districts", regencyId]).then((districts) => {
        const selectedDistrict = districts?.[0];
        const location = `${selectedDistrict?.label}`;

        enqueueSnackbar("", {
          key: "order",
          variant: "order",
          preventDuplicate: true,
          date,
          name,
          location,
        });

        setDelay(random(40, 100));
      });
    }, delay * 100);

    return () => clearTimeout(timeout);
  }, [delay, names]);

  useEffect(() => {
    fetchAPI(["names"], false).then(setNames);
  }, []);

  return (
    <>
      <SnackbarProvider
        dense={isMobile}
        maxSnack={1}
        Components={{ order: OrderNotification }}
        anchorOrigin={{
          vertical: isMobile ? "top" : "bottom",
          horizontal: isMobile ? "center" : "left",
        }}
      />
    </>
  );
};
