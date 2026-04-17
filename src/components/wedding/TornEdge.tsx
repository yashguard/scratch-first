const TORN_PATHS = [
  // Path 0
  "M0,120 L0,70 C60,30 120,85 200,50 C280,20 360,80 440,45 C520,15 600,75 680,55 C760,30 840,85 920,40 C1000,10 1080,70 1160,50 C1220,35 1300,80 1380,55 L1440,65 L1440,120 Z",
  // Path 1
  "M0,120 L0,55 C70,85 150,25 230,60 C310,90 390,20 470,55 C550,85 630,30 710,65 C790,95 870,15 950,50 C1030,80 1110,25 1190,60 C1270,90 1360,35 1440,70 L1440,120 Z",
  // Path 2
  "M0,120 L0,80 C90,45 170,95 260,50 C340,15 420,75 510,40 C590,10 670,70 750,45 C830,20 910,85 990,50 C1070,20 1150,75 1230,45 C1300,20 1370,60 1440,40 L1440,120 Z",
  // Path 3
  "M0,120 L0,45 C80,80 160,20 240,65 C320,100 400,30 480,70 C560,100 640,25 720,60 C800,90 880,20 960,55 C1040,85 1120,30 1200,65 C1280,95 1370,40 1440,75 L1440,120 Z",
  // Path 4
  "M0,120 L0,60 C50,20 130,80 210,35 C290,0 370,65 450,40 C530,15 610,80 690,50 C770,25 850,90 930,45 C1010,5 1090,70 1170,40 C1250,15 1340,70 1440,50 L1440,120 Z",
  // Path 5
  "M0,120 L0,75 C100,40 180,90 270,55 C350,25 430,85 510,50 C590,20 670,75 760,40 C840,10 920,70 1000,45 C1080,20 1160,80 1250,50 C1330,25 1390,65 1440,45 L1440,120 Z",
  // Path 6
  "M0,120 L0,50 C70,90 160,30 240,70 C320,100 400,25 480,60 C560,90 640,20 720,55 C800,85 880,25 960,60 C1040,90 1120,35 1200,70 C1280,100 1360,45 1440,80 L1440,120 Z",
  // Path 7
  "M0,120 L0,65 C80,30 160,85 240,45 C320,10 400,70 480,40 C560,15 640,75 720,50 C800,20 880,80 960,45 C1040,15 1120,70 1200,40 C1280,15 1360,65 1440,40 L1440,120 Z",
];

interface TornEdgeProps {
  index?: number;
  flip?: boolean;
  color?: string;
}

const TornEdge = ({
  index = 0,
  flip = false,
  color = "hsl(var(--cream))",
}: TornEdgeProps) => {
  const path = TORN_PATHS[index % TORN_PATHS.length];

  return (
    <div
      className="relative z-10" // z-10: must exceed any section z-index to paint over section backgrounds
      style={{
        marginTop: flip ? 0 : "-60px",
        marginBottom: flip ? "-60px" : 0,
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: "100px", display: "block", transform: flip ? "scaleY(-1)" : undefined }}
        aria-hidden="true"
      >
        <path d={path} fill={color} />
      </svg>
    </div>
  );
};

export default TornEdge;
