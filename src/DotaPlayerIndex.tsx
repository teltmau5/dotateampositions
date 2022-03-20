import { useEffect, useState } from "react";
import "./App.css";
import DotaPlayerCreate from "./DotaPlayerCreate";
import { DotaPlayer } from "./Models";
import { TrashIcon } from "@heroicons/react/solid";

function DotaPlayerIndex() {
  var roles = [1, 2, 3, 4, 5];

  const [players, setPlayers] = useState<DotaPlayer[]>([]);

  function addPlayer(newPlayerName: string) {
    var newValue = [...players, new DotaPlayer(newPlayerName, [], null)];
    setPlayers(newValue);
  }

  function setPlayerRole(
    p: DotaPlayer,
    position: number,
    checked: boolean
  ): void {
    var newValue = [...players];
    newValue[players.indexOf(p)] = checked
      ? p.withRole(position)
      : p.withoutRole(position);

    setPlayers(newValue);
  }

  useEffect(() => {
    // action on update of movies
  }, [players]);

  var stateValid =
    calculateRoles() !== null &&
    roles.filter(
      (r) => players.filter((player) => player.hasRole(r)).length === 0
    ).length === 0;

  function calculateAndSetRoles() {
    let newPlayers = calculateRoles();

    if (newPlayers !== null) {
      setPlayers(newPlayers);
    }
  }

  function calculateRoles() {
    function calculateRolesInner(currentList: number[], player: DotaPlayer) {
      var result: number[][] = [];

      for (let role of player.selectedRoles) {
        if (currentList.indexOf(role) === -1) {
          result.push([...currentList, role]);
        }
      }

      return result;
    }

    let currentLists: number[][] = [[]];
    for (let i = 0; i < players.length; i++) {
      let nextList: number[][] = [];

      for (let currentList of currentLists) {
        var result = calculateRolesInner(currentList, players[i]);

        for (let x of result) {
          nextList.push(x);
        }
      }

      currentLists = nextList;
    }

    if (!currentLists.length) {
      return null;
    }

    var finalOrder =
      currentLists[Math.floor(Math.random() * currentLists.length)];

    if (!finalOrder.length) {
      return null;
    }

    var newPlayers = [...players];

    for (let i = 0; i < players.length; i++) {
      newPlayers[i] = newPlayers[i].withFinalRole(finalOrder[i]);
    }

    return newPlayers;
  }

  function removePlayer(p: DotaPlayer): void {
    var tmp = [...players];
    tmp.splice(tmp.indexOf(p), 1);

    setPlayers(tmp);
  }

  return (
    <>
      <div className="mx-4 space-y-2">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="border-collapse border border-slate-400">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Spiller
                      </th>
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Valgt rolle
                      </th>

                      {roles.map((role, roleIndex) => {
                        return (
                          <th
                            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                            key={`role-${roleIndex}`}
                          >
                            {role}
                          </th>
                        );
                      })}
                      <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((p, playerIndex) => {
                      var playerKey = `player-id-${playerIndex}`;
                      return (
                        <tr key={playerKey} className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {p.name}
                          </td>

                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {p.finalRole}
                          </td>

                          {roles.map((role, roleIndex) => {
                            return (
                              <td
                                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                key={`${playerKey}-role-${roleIndex}`}
                              >
                                <input
                                  type="checkbox"
                                  checked={p.hasRole(role)}
                                  onChange={(e) =>
                                    setPlayerRole(p, role, e.target.checked)
                                  }
                                />
                              </td>
                            );
                          })}

                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            <a onClick={() => removePlayer(p)}>
                              <TrashIcon className="h-5 w-5 text-blue-500" />
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {players.length === 5 && (
          <>
            {stateValid && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={calculateAndSetRoles}
              >
                Beregn roller
              </button>
            )}

            {!stateValid && <div>Alle roller er ikke valgt</div>}
          </>
        )}

        {players.length < 5 && (
          <DotaPlayerCreate addPlayer={addPlayer} enable={players.length < 5} />
        )}
      </div>
    </>
  );
}

export default DotaPlayerIndex;
