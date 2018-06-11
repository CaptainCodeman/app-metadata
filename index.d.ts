declare global {
    interface DocumentEventMap {
        'app-metadata': CustomEvent<Metadata>;
    }
}
export declare function addMetadataListener(): void;
export declare type Metadata = {
    [key: string]: string;
};
export declare type MetadataEntry = {
    key: string;
    value: string;
};
export declare function updateMetadata(data: Metadata, entries?: MetadataEntry[][]): void;
