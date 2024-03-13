import { Stage } from "ngl";
import { useEffect, useState } from "react";
// import { Tooltip } from "primereact/tooltip";

// https://alphafold.ebi.ac.uk/files/AF-A0A010QAA5-F1-model_v4.pdb
const aa3To1Map = {
  ALA: "A",
  ARG: "R",
  ASN: "N",
  ASP: "D",
  CYS: "C",
  GLU: "E",
  GLN: "Q",
  GLY: "G",
  HIS: "H",
  HYP: "O",
  ILE: "I",
  LEU: "L",
  LYS: "K",
  MET: "M",
  PHE: "F",
  PRO: "P",
  GLP: "U",
  SER: "S",
  THR: "T",
  TRP: "W",
  TYR: "Y",
  VAL: "V",
};

const blockNumber = 10;
function AASequence({ sequence }) {
  if (!sequence || sequence.length < 1) return <></>;

  const nonHbYX = sequence;
  // const nonHbYX = sequence.slice(0, -3);
  // const hbyx = sequence.slice(-3);

  const total = nonHbYX.length;
  const hasRemainer = total % blockNumber > 0;

  const blockCount = Math.floor(total / blockNumber) + (hasRemainer ? 1 : 0);

  const blocks = [];
  let x = 0;
  for (let i = 0; i < blockCount; i++) {
    blocks[i] = [];
    for (let k = 0; k < blockNumber; k++) {
      blocks[i][k] = nonHbYX[x];
      x++;
    }
  }
  // console.log({ blocks, nonHbYX, hbyx, total, hasRemainer, blockCount });

  // edge case example: A0A010QH72
  function BlockOf10({ letters, multiple, isHbYX }) {
    let aas = letters.filter(Boolean);
    let hbyx = [];
    if (isHbYX) {
      hbyx = aas.slice(-3);
      aas = aas.slice(0, -3);
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "30px",
          marginBottom: "15px",
        }}
      >
        <span
          style={{
            height: "15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span></span>
          <span>{aas.length === 10 ? multiple * blockNumber : null}</span>
        </span>
        <span>
          <span>{aas}</span>
          {isHbYX && (
            <>
              {/* <Tooltip target=".hbyx" hideEvent="lol" /> */}
              <span
                style={{
                  color: "red",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
                className="hbyx"
                data-pr-tooltip="HbYX Motif"
                data-pr-position="top"
                data-pr-at="right+5 top"
                data-pr-my="left center-2"
              >
                {hbyx}
              </span>
            </>
          )}
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "monospace",
        maxWidth: "60%",
        maxHeight: "90%",
        display: "flex",
        flexWrap: "wrap",
        overflow: "auto",
      }}
    >
      {blocks.map((block, i) =>
        i !== blocks.length - 1 ? (
          <BlockOf10 key={i} letters={block} multiple={i + 1} />
        ) : (
          <BlockOf10 key={i} letters={block} multiple={i + 1} isHbYX={true} />
        )
      )}
    </div>
  );
}

export function ProteinViewer({ id }) {
  const [residues, setResidues] = useState([]);

  useEffect(() => {
    var stage = new Stage("my-stage", {
      backgroundColor: "white",
      clipNear: -1000,
      clipFar: 1000,
      fogFar: 1000,
      fogNear: -1000,
      quality: "high",
    });
    // load a PDB structure and consume the returned `Promise`
    const url = `https://alphafold.ebi.ac.uk/files/AF-${id}-F1-model_v4.pdb`;
    console.log(url);
    stage
      .loadFile(url, { defaultRepresentation: "true" })
      .then(function (component) {
        component.autoView();
        console.log(stage);
        const typeIds = stage.compList[0].structure.residueStore.residueTypeId;
        const residueMap = stage.compList[0].structure.residueMap;
        const resCount = stage.compList[0].structure.residueStore.count;
        const resNames = [];
        for (let i = 0; i < resCount; i++) {
          const name = residueMap.get(typeIds[i]).resname;
          resNames[i] = name;
        }
        const resLetters = resNames.map((r) => aa3To1Map[r]);
        setResidues(resLetters);
      });
  }, []);

  // style={{ height: "300px", width: "400px", border: "1px solid black" }}
  return (
    <div style={{ display: "flex" }}>
      <div
        id="my-stage"
        style={{ height: "300px", width: "400px", marginRight: "20px" }}
      ></div>
      <AASequence sequence={residues} />
    </div>
  );
}
