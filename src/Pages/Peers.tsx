import { useDevice } from "@core/Providers/DeviceProvider.jsx";
import {
  Component,
  For,
  createComputed,
  createMemo,
  createSignal,
} from "solid-js";
import {
  flexRender,
  getCoreRowModel,
  ColumnDef,
  createSolidTable,
} from "@tanstack/solid-table";
import { Protobuf } from "@meshtastic/meshtasticjs";
import { Sidebar } from "@components/Layout/Sidebar/index.jsx";

type TableDataType = Omit<Protobuf.NodeInfo, keyof Protobuf.native.Message>;

export const PeersPage: Component = () => {
  const { activeDevice } = useDevice();

  const filteredNodes = createMemo(() => {
    return (
      activeDevice()?.nodes.filter(
        (node) => node.num !== activeDevice()?.nodeNum,
      ) ?? []
    );
  });

  const defaultColumns: ColumnDef<TableDataType>[] = [
    {
      accessorKey: "num",
      cell: (info) => info.getValue(),
    },

    // {
    //   accessorFn: row => row.lastName,
    //   id: 'lastName',
    //   cell: info => <i>{info.getValue<string>()}</i>,
    //   header: () => <span>Last Name</span>,
    //   footer: info => info.column.id,
    // },
    // {
    //   accessorKey: 'age',
    //   header: () => 'Age',
    //   footer: info => info.column.id,
    // },
    // {
    //   accessorKey: 'visits',
    //   header: () => <span>Visits</span>,
    //   footer: info => info.column.id,
    // },
    // {
    //   accessorKey: 'status',
    //   header: 'Status',
    //   footer: info => info.column.id,
    // },
    // {
    //   accessorKey: 'progress',
    //   header: 'Profile Progress',
    //   footer: info => info.column.id,
    // },
  ];

  const table = createSolidTable({
    get data() {
      // return data();
      return filteredNodes();
      // return activeDevice()?.nodes ?? [];
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="border-b">
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <For each={table.getRowModel().rows}>
            {(row) => (
              <tr>
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <td class="px-6 py-4 whitespace-nowrap">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      {/* <Table
          headings={[
            { title: "", type: "blank", sortable: false },
            { title: "Name", type: "normal", sortable: true },
            { title: "Model", type: "normal", sortable: true },
            { title: "MAC Address", type: "normal", sortable: true },
            { title: "Last Heard", type: "normal", sortable: true },
            { title: "SNR", type: "normal", sortable: true }
          ]}
          rows={filteredNodes.map((node) => [
            <Hashicon size={24} value={node.num.toString()} />,
            <h1>
              {node.user?.longName ?? node.user?.macaddr
                ? `Meshtastic ${base16
                    .stringify(node.user?.macaddr.subarray(4, 6) ?? [])
                    .toLowerCase()}`
                : `UNK: ${node.num}`}
            </h1>,

            <Mono>{Protobuf.HardwareModel[node.user?.hwModel ?? 0]}</Mono>,
            <Mono>
              {base16
                .stringify(node.user?.macaddr ?? [])
                .match(/.{1,2}/g)
                ?.join(":") ?? "UNK"}
            </Mono>,
            node.lastHeard === 0 ? (
              <p>Never</p>
            ) : (
              <TimeAgo timestamp={node.lastHeard * 1000} />
            ),
            <Mono>
              {node.snr}db/
              {Math.min(Math.max((node.snr + 10) * 5, 0), 100)}%/
              {(node.snr + 10) * 5}raw
            </Mono>
          ])}
        /> */}
    </>
  );
};
