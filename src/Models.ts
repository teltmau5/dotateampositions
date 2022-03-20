import { debug } from "console";

export class DotaPlayer {
  constructor(public name: string, public selectedRoles: number[], public finalRole: number | null)
  {
  }

  hasRole(role: number)
  {
    return this.selectedRoles.indexOf(role) !== -1;
  }

  withRole(role: number)
  {
    var newPlayer = new DotaPlayer(this.name, [...this.selectedRoles, role], this.finalRole);

    return newPlayer;
  }
  
  withoutRole(role: number)
  {
    return new DotaPlayer(this.name, this.selectedRoles.filter(r => r !== role), this.finalRole);
  }

  withFinalRole(finalRole: number)
  {
    var newPlayer = new DotaPlayer(this.name, this.selectedRoles, finalRole);

    return newPlayer;
  }

  withoutFinalRole()
  {
    var newPlayer = new DotaPlayer(this.name, this.selectedRoles, null);

    return newPlayer;
  }
}