declare module 'mysql2' {
    import { Connection } from 'mysql2/promise';
    
    interface ConnectionConfig {
        // Define the properties of the ConnectionConfig interface here
        host: string;
        user: string;
        password: string;
        database: string;
        
    }
  
    export function createConnection(config: ConnectionConfig): Connection;
}
