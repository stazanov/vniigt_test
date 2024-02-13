import {useState, useEffect} from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {CharacteristicsType} from "../type/type";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {changeCharacteristicsActionCreator, setCharacteristicsActionCreator} from "../redux/actions";
import {isValid} from "../utils/isValid";
import "./Trains.css"


const TableCell = ({getValue, row, column, table}: any) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      style={isValid({header: column.id, value}) ? undefined : {color: "red"}}
    />
  );
};
const columnHelper = createColumnHelper<CharacteristicsType>();
const columns = [
  columnHelper.accessor("engineAmperage", {
    header: "Ток двигателя",
    cell: TableCell,
  }),
  columnHelper.accessor("force", {
    header: "Сила тяги",
    cell: TableCell,
  }),
  columnHelper.accessor("speed", {
    header: "Скорость",
    cell: TableCell,
  }),
];

export const CharacteristicsTable = ({name}: { name: string }) => {
  const data = useAppSelector(state => state.trainList.find((train) => train.name === name)?.characteristics.data) || []
  const isValidTable = useAppSelector(state => state.trainList.find((train) => train.name === name)?.characteristics.isValid)

  const dispatch = useAppDispatch()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: string) => {
        const newData: CharacteristicsType[] = data.map((row, index) => {
          if (index === rowIndex) {
            return {
              ...data[rowIndex],
              [columnId]: value,
            };
          }
          return row;
        })
        dispatch(changeCharacteristicsActionCreator(name, newData))
      },
    },
  });
  return (
    <>
      <h2>{name}</h2>
      <table>
        <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      <div>
        <button disabled={!isValidTable} onClick={() => dispatch(setCharacteristicsActionCreator(data))}>
          Отправить данные
        </button>
      </div>
    </>
  );
};