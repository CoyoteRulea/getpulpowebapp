export interface Vehicle {
  _id:        string;
  vehicle_id: string;
  brand:      string;
  model:      string;
  color:      string;
  status:     boolean;
  assigned:   boolean;
}

export interface VehicleResponse {
  vehicle:    Vehicle;
  statusCode: number;
  msg:        string;
}
