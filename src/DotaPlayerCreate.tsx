import { FormEvent, useState } from "react";

interface IProps {
  addPlayer: (playerName: string) => void;
  enable: boolean;
}

function DotaPlayerCreate(props: IProps) {
  const [newPlayerName, setNewPlayerName] = useState<string>("");

  function addPlayer(e: FormEvent) {
    if (newPlayerName) {
      props.addPlayer(newPlayerName);

      setNewPlayerName("");
    }

    e.preventDefault();
  }

  return (
    <>
      <div>
        <form onSubmit={addPlayer} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <fieldset disabled={!props.enable}>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Spillernavn
              </label>
              <input required autoFocus className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Spillernavn"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)} />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Opret
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default DotaPlayerCreate;
