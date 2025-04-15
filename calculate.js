const m = 0.28;

const values = [
  {
    angle: 30,
    times: [2.214, 2.2818, 2.3138, 2.3475, 2.4143],
    a: [
      [490.2, 674.1],
      [499.1, 660.7],
      [503.6, 654.5],
      [499.1, 649.1],
      [478.6, 642.9],
    ],
    b: [
      [621.4, 670.5],
      [594.6, 650.9],
      [579.5, 641.1],
      [573.2, 628.6],
      [575.9, 601.8],
    ],
  },
  {
    angle: 45,
    times: [1.9378, 2.0058, 2.0378, 2.0746, 2.1376],
    a: [
      [531.3, 608],
      [542, 584.8],
      [547.3, 573.2],
      [540.2, 568.8],
      [520.5, 561.6],
    ],
    b: [
      [650.9, 553.6],
      [625, 543.8],
      [610.7, 539.3],
      [610.7, 528.6],
      [615.2, 504.5],
    ],
  },
  {
    angle: 90,
    times: [12.3485, 12.4138, 12.4483, 12.4818, 12.5521],
    a: [
      [293.8, 779.5],
      [287.5, 783],
      [283.9, 788.4],
      [280.4, 792],
      [278.6, 793.8],
    ],
    b: [
      [317, 686.6],
      [333, 713.4],
      [333, 716.1],
      [331.3, 719.6],
      [330.4, 721.4],
    ],
  },
  {
    angle: 160,
    times: [1.2098, 1.2778, 1.31, 1.3418, 1.4098],
    a: [
      [508.9, 489.3],
      [509.8, 462.5],
      [500.9, 461.6],
      [490.2, 464.3],
      [467.9, 469.6],
    ],
    b: [
      [560.7, 381.3],
      [551.8, 404.5],
      [557.1, 403.6],
      [564.3, 400],
      [579.5, 393.8],
    ],
  },
  {
    angle: 180,
    times: [5.7818, 5.846, 5.882, 5.9142, 5.9838],
    a: [
      [496.4, 482.1],
      [497.3, 512.5],
      [498.2, 516.1],
      [501.8, 501.8],
      [508, 474.1],
    ],
    b: [
      [492, 627.7],
      [492, 598.2],
      [491.1, 593.8],
      [488.4, 608],
      [483, 636.6],
    ],
  },
];

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(
    (((x2 - x1) / 1.12) * (1 / 1000)) ** 2 +
      (((y2 - y1) / 1.12) * (1 / 1000)) ** 2
  );
}

function printValues(t, x1, y1, x2, y2) {
  const d = Math.sqrt(
    (((x2 - x1) / 1.12) * (1 / 1000)) ** 2 +
      (((y2 - y1) / 1.12) * (1 / 1000)) ** 2
  );
  console.log("d:", d, "m");

  const v = d / t;
  console.log("V:", v, "m/s");

  const p = m * v;
  console.log("p:", p, "kg*m/s");

  const KE = (1 / 2) * m * v ** 2;
  console.log("KE:", KE, "J");
}
values.forEach((value) => {
  console.log("Angle:", value.angle + "°");
  const x1 = value.a[1][0] - value.a[0][0];
  const y1 = value.a[1][1] - value.a[0][1];
  const x2 = value.b[1][0] - value.b[0][0];
  const y2 = value.b[1][1] - value.b[0][1];
  const angleRad = Math.atan2(y2, x2) - Math.atan2(y1, x1);
  const angleDeg = (angleRad * 180) / Math.PI;
  const angleDegAbs = Math.abs(angleDeg);
  const angleDegFinal = angleDegAbs > 180 ? 360 - angleDegAbs : angleDegAbs;
  console.log("Actual angle of collision:", angleDegFinal.toFixed(2) + "°");

  console.log("Before:");
  const tBefore = value.times[1] - value.times[0];
  console.log("t:", tBefore, "s");
  console.log("Puck A:");
  printValues(
    tBefore,
    value.a[0][0],
    value.a[0][1],
    value.a[1][0],
    value.a[1][1]
  );
  console.log("Puck B:");
  printValues(
    tBefore,
    value.b[0][0],
    value.b[0][1],
    value.b[1][0],
    value.b[1][1]
  );
  console.log("\nAfter:");
  const tAfter = value.times[4] - value.times[3];
  console.log("t:", tAfter, "s");
  console.log("Puck A:");
  printValues(
    tAfter,
    value.a[3][0],
    value.a[3][1],
    value.a[4][0],
    value.a[4][1]
  );
  console.log("Puck B:");
  printValues(
    tAfter,
    value.b[3][0],
    value.b[3][1],
    value.b[4][0],
    value.b[4][1]
  );

  console.log("-".repeat(40));
});
