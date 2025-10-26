'use client'

import * as SwitchPrimitive from '@radix-ui/react-switch'
import it from '#/i18n/it.json'
import Image from 'next/image'
import { useState } from 'react'

import { AREAS_IDS } from '@/db/collections/Areas'
import { Area } from '@/payload-types'

import { OrtoMapDrawer } from './orto-map-drawer'
import { cn } from './shadcn/lib/utils'

//

type Props = {
	className?: string
	children?: React.ReactNode
	areas?: Area[]
}

export default function OrtoMap(props: Props) {
	const { className, children, areas = [] } = props
	const [currentSeason, setCurrentSeason] = useState(getCurrentSeasonByDate())

	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const [selectedArea, setSelectedArea] = useState<Area>()

	function onAreaClick(areaKey: string) {
		const area = areas.find((area) => area.key === areaKey)
		if (!area) return
		setSelectedArea(area)
		setIsDrawerOpen(true)
	}

	return (
		<>
			<div className={cn('block relative aspect-2000/1377', className)}>
				<Image
					src="/mappa-inverno.webp"
					width="2000"
					height="1377"
					alt="Mappa Inverno"
					priority
					className={cn(
						'absolute top-0 left-0 w-full aspect-2000/1377',
						'transition-opacity duration-500',
						{
							'opacity-0': currentSeason !== 'inverno',
						},
					)}
				/>
				<Image
					width="2000"
					height="1377"
					src="/mappa-estate.webp"
					alt="Mappa Estate"
					priority
					className={cn(
						'absolute top-0 left-0 w-full aspect-2000/1377',
						'transition-opacity duration-500',
						{
							'opacity-0': currentSeason !== 'estate',
						},
					)}
				/>

				<SeasonSwitch
					className="fixed right-6 bottom-6 xl:absolute xl:right-0 xl:bottom-0 z-10"
					checked={currentSeason === 'estate'}
					onCheckedChange={(checked) => {
						setCurrentSeason(checked ? 'estate' : 'inverno')
					}}
				/>

				<div className="absolute top-0 right-0">{children}</div>

				<svg
					width="2000"
					height="1377"
					viewBox="0 0 2000 1377"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="w-full h-fit absolute top-0 left-0 mix-blend-multiply aspect-2000/1377"
				>
					<g className="group">
						{paths.map((path) => (
							<path
								key={path.id}
								id={path.id}
								d={path.d}
								fill={path.fill}
								className="group-hover:opacity-30 hover:opacity-100! duration-300 hover:cursor-pointer transition-all"
								onClick={() => onAreaClick(path.id)}
							/>
						))}
					</g>
				</svg>
			</div>

			<OrtoMapDrawer open={isDrawerOpen} setOpen={setIsDrawerOpen} area={selectedArea} />
		</>
	)
}

type Path = {
	id: string
	d: string
	fill: string
}

const ID = AREAS_IDS

const paths: Path[] = [
	{
		id: ID.entrata,
		d: 'M1850.34 746.843C1850.34 746.843 1859.96 742.621 1868.97 736.75C1943.7 688.081 1940.56 623.314 1940.56 623.314C1942.49 576.914 1908.67 528.531 1862.47 524.006C1848.74 522.66 1834.9 525.008 1821.5 528.332C1806 532.175 1790.53 537.486 1777.72 547.03C1761.72 558.943 1751.01 576.573 1742.19 594.461C1730.06 619.051 1720.62 645.665 1720.62 673.085C1720.61 685.38 1721.44 698.988 1729.29 714.113C1748.24 750.582 1790.34 757.31 1792.34 757.596C1817.6 761.22 1838.84 751.891 1850.34 746.843H1850.34Z',
		fill: '#8DAC5C',
	},
	{
		id: ID.tepee,
		d: 'M767.977 1066.08C772.48 1058.71 785.249 1037.15 783.901 1006.93C783.714 1002.77 781.229 964.291 752.889 939.328C745.677 932.976 737.44 927.73 728.383 925.398C708.339 920.25 687.462 930.029 670.797 943.106C652.492 957.467 636.452 977.457 632.823 1001.57C631.245 1012.05 632.09 1022.82 634.055 1033.24C635.59 1041.38 646.895 1093.08 686.838 1104.75C712.289 1112.19 734.506 1099.02 739.08 1096.31C755.112 1086.8 763.461 1073.48 767.981 1066.09L767.977 1066.08Z',
		fill: '#C3D898',
	},
	{
		id: ID.compostiera,
		d: 'M490.945 1202.58C519.106 1165 510.367 1118.89 509.711 1115.7C501.524 1075.84 472.919 1054.16 456.608 1041.27C442.153 1029.85 425.838 1020.15 407.782 1016.5C372.216 1009.32 334.406 1027.89 313.314 1057.42C292.222 1086.96 286.386 1125.49 291.508 1161.43C296.994 1199.93 319.066 1240.47 356.843 1249.65C369.246 1252.67 379.339 1251.83 399.787 1249.19C416.833 1246.98 447.79 1242.57 474.979 1219.31C478.476 1216.32 484.644 1210.98 490.945 1202.57V1202.58Z',
		fill: '#9C6E55',
	},
	{
		id: ID.ricettario,
		d: 'M1196.85 498.11C1202.72 484.34 1209.42 468.637 1206.17 449.644C1203.12 431.777 1192.79 419.74 1185.11 410.885C1181.49 406.709 1177.75 402.442 1172.89 399.832C1156.65 391.123 1137.56 404.112 1124.34 416.947C1104.26 436.431 1085.02 458.437 1077.55 485.399C1070.07 512.362 1077.6 545.279 1101.53 559.772C1106.66 562.88 1112.52 565.082 1118.52 564.925C1126.25 564.721 1132.01 561.696 1137.02 558.679C1159.09 545.391 1174.04 536.387 1187.11 516.451C1188.49 514.348 1192.78 507.658 1196.84 498.114L1196.85 498.11Z',
		fill: '#D3A182',
	},
	{
		id: ID.serra,
		d: 'M782.887 822.643C826.815 796.004 879.149 720.679 864.599 640.762C861.682 624.754 855.025 587.816 824.16 566.05C810.492 556.41 793.9 551.563 777.268 549.805C744.393 546.332 710.388 554.756 682.929 573.174C657.808 590.026 638.517 614.684 625.189 641.843C609.828 673.141 602.005 708.962 608.2 743.266C609.823 752.257 621.398 799.47 667.531 824.512C703.275 843.913 744.452 841.483 773.415 827.773C777.926 825.639 781.125 823.709 782.887 822.643Z',
		fill: '#C7E0DF',
	},
	{
		id: ID.eventi,
		d: 'M1023.1 1093.99C1021.87 1109.62 1030.74 1124.88 1043.3 1134.26C1055.86 1143.63 1071.6 1147.81 1087.19 1149.41C1140.96 1154.89 1196.81 1129.54 1228.1 1085.45C1242.46 1065.23 1251.95 1040.4 1248.92 1015.78C1244.26 977.91 1211.91 949.577 1178.71 930.775C1163 921.874 1146.29 914.125 1128.43 911.499C1110.56 908.873 1091.3 911.852 1076.88 922.726C1061.97 933.97 1053.96 951.991 1047.72 969.596C1033.37 1010.13 1025.18 1052.83 1023.52 1095.8',
		fill: '#E3AE24',
	},
	{
		id: ID.percorsoAromatico,
		d: 'M1107.09 749.314C1107.07 742.715 1106.7 720.946 1091.39 704.259C1089.08 701.741 1086.82 699.759 1083.66 697.333C1068.43 685.632 1036.64 659.907 1005.66 668.853C992.432 672.672 981.143 681.477 971.743 691.54C951.661 713.039 938.718 741.809 939.005 771.232C939.291 800.659 953.725 830.252 978.422 846.236C1003.12 862.221 1037.73 862.708 1061.35 845.177C1078.29 832.599 1088.25 813.386 1092.5 804.469C1097.5 794.002 1100.37 783.959 1101.53 779.854C1104.88 767.929 1107.12 759.988 1107.09 749.318V749.314Z',
		fill: '#688B3F',
	},
	{
		id: ID.vasche,
		d: 'M1037.55 414.096C1030.96 406.128 1023.27 400.688 1012.65 393.173C1004.89 387.686 998.156 382.979 988.135 378.851C987.032 378.398 974.536 373.33 960.517 371.826C956.039 371.344 916.7 365.832 890.614 391.366C866.666 414.809 862.114 450.536 860.379 483.476C859.699 496.398 859.345 509.84 864.684 521.698C874.986 544.553 903.071 554.512 928.724 556.62C939.186 557.48 981.645 564.567 1017.31 535.626C1020.05 533.4 1057.11 502.346 1053.79 457.473C1053.34 451.45 1051.86 431.415 1037.54 414.1L1037.55 414.096Z',
		fill: '#D87670',
	},
	{
		id: ID.percorsoAlimurgico,
		d: 'M524.768 662.144C538.975 658.818 554.978 655.068 567.786 647.476C594.89 631.412 603.721 600.347 607.078 589.397C615.998 560.305 615.61 526.765 598.631 501.516C580.365 474.355 545.33 461.478 512.735 464.409C480.14 467.34 450.051 484.129 425.537 505.814C403.389 525.405 383.932 552.681 387.404 582.052C390.438 607.732 408.536 624.423 421.33 636.077C427.115 641.348 456.909 668.487 495.828 667.059C505.246 666.715 513.614 664.756 524.772 662.14L524.768 662.144Z',
		fill: '#649C9E',
	},
	{
		id: ID.atelier,
		d: 'M944.744 279.684C946.729 275.674 962.019 243.559 949.35 209.013C938.456 179.291 913.434 166.502 886.735 151.984C872.36 144.168 856.672 137.212 840.336 138.072C820.503 139.115 802.651 151.876 791.303 168.18C779.96 184.485 774.273 204.035 770.219 223.485C764.305 251.873 762.307 284.142 779.906 307.187C797.716 330.514 827.011 333.771 838.359 335.134C876.559 339.717 912.105 321.804 932.233 298.378C939.623 289.781 943.61 281.977 944.744 279.684Z',
		fill: '#D0ABA2',
	},
	{
		id: ID.alberiDaFrutto,
		d: 'M1554.19 957.843C1601 945.739 1616.79 883.121 1619.08 873.9C1628.95 834.21 1618.62 801.742 1606.83 764.458C1598.06 736.701 1586.46 708.671 1565.11 688.892C1543.76 669.118 1510.42 659.765 1484.78 673.535C1472.27 680.258 1462.9 691.543 1454.51 703.012C1438.48 724.934 1424.8 748.577 1413.78 773.404C1398.48 807.863 1393.39 827.03 1397.22 850.349C1406.49 906.842 1469.96 935.762 1488.95 944.413C1511.9 954.867 1531.37 963.743 1554.19 957.843Z',
		fill: '#EECC79',
	},
]

//

type Season = 'estate' | 'inverno'

function getCurrentSeasonByDate(): Season {
	const now = new Date()
	const month = now.getMonth() + 1
	if (month > 3 && month <= 9) {
		return 'estate'
	} else {
		return 'inverno'
	}
}

type SeasonSwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root>

function SeasonSwitch({ className, ...props }: SeasonSwitchProps) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				'data-[state=checked]:bg-amber-200 data-[state=unchecked]:bg-blue-300',
				'flex w-42 shrink-0 items-center p-1',
				'rounded-lg border border-transparent shadow-xs outline-none focus-visible:ring-[1rem]',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'focus-visible:border-ring focus-visible:ring-ring/50',
				'peer transition-all relative group cursor-pointer hover:ring-2 hover:ring-amber-400',
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					'data-[state=checked]:translate-x-20 data-[state=unchecked]:translate-x-0',
					'bg-white pointer-events-none block ring-0',
					thumbBaseClasses,
				)}
			/>
			<div className="absolute top-0 left-0 w-full h-full p-1 flex">
				<span
					className={cn(
						'group-data-[state=unchecked]:opacity-100',
						thumbBaseClasses,
						thumbTextClasses,
					)}
				>
					{it.winter}
				</span>
				<span
					className={cn(
						'group-data-[state=checked]:opacity-100',
						thumbBaseClasses,
						thumbTextClasses,
					)}
				>
					{it.summer}
				</span>
			</div>
		</SwitchPrimitive.Root>
	)
}

const thumbBaseClasses = 'w-20 px-2 h-8 flex items-center justify-center rounded-md transition-all'
const thumbTextClasses = 'opacity-45 group-hover:opacity-100 group-hover:bg-white/30'
