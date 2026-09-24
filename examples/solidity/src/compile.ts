import solc from "solc";

export type AbiItem = { type: string; name?: string; [key: string]: unknown };
export type Compilation = { abi: AbiItem[]; bytecode: string; runtimeBytecode: string };

type SolcError = { severity: string; formattedMessage: string };
type SolcOutput = {
  errors?: SolcError[];
  contracts?: Record<string, Record<string, {
    abi: AbiItem[];
    evm: { bytecode: { object: string }; deployedBytecode: { object: string } };
  }>>;
};

export function compile(fileName: string, source: string, contractName: string): Compilation {
  const input = {
    language: "Solidity",
    sources: { [fileName]: { content: source } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode.object", "evm.deployedBytecode.object"] } } },
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input))) as SolcOutput;
  const failures = output.errors?.filter((error) => error.severity === "error") ?? [];
  if (failures.length) throw new Error(failures.map((error) => error.formattedMessage).join("\n"));
  const contract = output.contracts?.[fileName]?.[contractName];
  if (!contract) throw new Error(`${fileName}: contract ${contractName} was not produced`);
  return {
    abi: contract.abi,
    bytecode: `0x${contract.evm.bytecode.object}`,
    runtimeBytecode: `0x${contract.evm.deployedBytecode.object}`,
  };
}
