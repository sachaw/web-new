import { useDevice } from "@core/Providers/DeviceProvider.jsx";
import { Sidebar } from "lucide-solid";
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

type TableDataType = Omit<Protobuf.NodeInfo, keyof Protobuf.native.Message>;

export const PeersPage: Component = () => {
  const { activeDevice } = useDevice();

  const defaultColumns: ColumnDef<TableDataType>[] = [
    {
      accessorKey: "num",
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
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

  const data = createMemo<TableDataType[]>(() => {
    return (
      activeDevice()?.nodes.map((node) => {
        return {
          channel: node.channel,
          lastHeard: node.lastHeard,
          num: node.num,
          position: node.position,
          snr: node.snr,
          deviceMetrics: node.deviceMetrics,
          user: node.user,
        };
      }) ?? []
    );
  });

  const table = createSolidTable({
    get data() {
      return data();
      // return activeDevice()?.nodes ?? [];
    },
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Sidebar />
      <div class="w-full overflow-y-auto">
        <div class="p-2">
          <table>
            <thead>
              <For each={table.getHeaderGroups()}>
                {(headerGroup) => (
                  <tr>
                    <For each={headerGroup.headers}>
                      {(header) => (
                        <th>
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
            <tbody>
              <For each={table.getRowModel().rows}>
                {(row) => (
                  <tr>
                    <For each={row.getVisibleCells()}>
                      {(cell) => (
                        <td>
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
            <tfoot>
              <For each={table.getFooterGroups()}>
                {(footerGroup) => (
                  <tr>
                    <For each={footerGroup.headers}>
                      {(header) => (
                        <th>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.footer,
                                header.getContext(),
                              )}
                        </th>
                      )}
                    </For>
                  </tr>
                )}
              </For>
            </tfoot>
          </table>
          <div class="h-4" />
        </div>
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
      </div>
    </>
  );
};
