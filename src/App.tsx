import { useEffect, useState } from "react";
import { useMovieData } from "./hooks/movie";
import MovieCard from "./MovieCard";

const DATA = {
  header: ["First Name", "Last Name", "Age"],
  data: [
    {
      values: {
        firstName: "AAA",
        lastName: "aaa",
        age: 25,
      },
    },
    {
      values: {
        firstName: "BBB",
        lastName: "bbb",
        age: 56,
      },
      next: {
        header: ["Trait", "Class", "Level"],
        data: [
          {
            values: {
              trait: "Trait 1",
              class: "Class 1",
              level: 1,
            },
          },
          {
            values: {
              trait: "Trait 2",
              class: "Class 2",
              level: 4,
            },
          },
        ],
      },
      next: {
        header: ["Color", "Rarity"],
        data: [
          {
            values: {
              color: "Red",
              rarity: "Common",
            },
            next: {
              header: ["type", "module"],
              data: [
                {
                  values: {
                    type: "type 1",
                    module: "module 1",
                  },
                },
                {
                  values: {
                    type: "type 2",
                    module: "module 2",
                  },
                },
                {
                  values: {
                    type: "type 3",
                    module: "module 3",
                  },
                },
              ],
            },
          },
          {
            values: {
              color: "Blue",
              rarity: "Rare",
            },
          },
        ],
      },
    },
    {
      values: {
        firstName: "CCC",
        lastName: "ccc",
        age: 43,
      },
    },
  ],
};

const App = () => {
  const { movies, setMovies, isLoading } = useMovieData();

  return (
    <>
      <Table header={DATA.header} data={DATA.data} />
      <div className="grid gap-10 mx-2 my-3 sm:grid-cols-2 xl:grid-cols-3">
        {movies?.map((movie) => (
          <>
            <MovieCard {...movie} />
          </>
        ))}
      </div>
    </>
  );
};

type TableProps = {
  children?: React.ReactNode;
  header: string[];
  data: any[];
};

const Table = ({ header, data }: TableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          {header.map((item, index) => (
            <th key={index} className="border border-solid border-slate-600">
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <TableDataRow key={index} data={item.values} next={item.next} />
        ))}
      </tbody>
    </table>
  );
};

type TableDataRowProps = {
  children?: React.ReactNode;
  data: any[];
  next?: TableProps;
};

const TableDataRow = ({ data, next }: TableDataRowProps) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <tr onClick={() => setShow(!show)}>
        {Object.values(data).map((item, index) => (
          <td
            key={index}
            className={`border border-solid border-slate-600 ${
              next && "cursor-pointer"
            }`}
          >
            {item}
          </td>
        ))}
      </tr>
      {next && show && (
        <tr className="bg-red-200">
          <td colSpan={Object.keys(data).length}>
            <Table header={next.header} data={next.data} />
          </td>
        </tr>
      )}
    </>
  );
};

export default App;
