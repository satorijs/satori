import { Internal, Locale } from '.'

export namespace ApplicationRoleConnection {
  /** https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-structure */
  export interface Metadata {
    /** type of metadata value */
    type: MetadataType
    /** dictionary key for the metadata field (must be a-z, 0-9, or _ characters; 1-50 characters) */
    key: string
    /** name of the metadata field (1-100 characters) */
    name: string
    /** translations of the name */
    name_localizations?: Record<Locale, 'string'>
    /** description of the metadata field (1-200 characters) */
    description: string
    /** translations of the description */
    description_localizations?: Record<Locale, 'string'>
  }

  /** https://discord.com/developers/docs/resources/application-role-connection-metadata#application-role-connection-metadata-object-application-role-connection-metadata-type */
  export enum MetadataType {
    /** the metadata value (integer) is less than or equal to the guild's configured value (integer) */
    INTEGER_LESS_THAN_OR_EQUAL = 1,
    /** the metadata value (integer) is greater than or equal to the guild's configured value (integer) */
    INTEGER_GREATER_THAN_OR_EQUAL = 2,
    /** the metadata value (integer) is equal to the guild's configured value (integer) */
    INTEGER_EQUAL = 3,
    /** the metadata value (integer) is not equal to the guild's configured value (integer) */
    INTEGER_NOT_EQUAL = 4,
    /** the metadata value (ISO8601 string) is less than or equal to the guild's configured value (integer; days before current date) */
    DATETIME_LESS_THAN_OR_EQUAL = 5,
    /** the metadata value (ISO8601 string) is greater than or equal to the guild's configured value (integer; days before current date) */
    DATETIME_GREATER_THAN_OR_EQUAL = 6,
    /** the metadata value (integer) is equal to the guild's configured value (integer; 1) */
    BOOLEAN_EQUAL = 7,
    /** the metadata value (integer) is not equal to the guild's configured value (integer; 1) */
    BOOLEAN_NOT_EQUAL = 8,
  }
}

declare module './internal' {
  interface Internal {
    /**
     * Returns a list of application role connection metadata objects for the given application.
     * @see https://discord.com/developers/docs/resources/application-role-connection-metadata#get-application-role-connection-metadata-records
     */
    getApplicationRoleConnectionMetadataRecords(): Promise<ApplicationRoleConnection.Metadata[]>
    /**
     * Updates and returns a list of application role connection metadata objects for the given application.
     * @see https://discord.com/developers/docs/resources/application-role-connection-metadata#update-application-role-connection-metadata-records
     */
    updateApplicationRoleConnectionMetadataRecords(): Promise<ApplicationRoleConnection.Metadata[]>
  }
}

Internal.define({
  '/applications/{application.id}/role-connections/metadata': {
    GET: 'getApplicationRoleConnectionMetadataRecords',
    PUT: 'updateApplicationRoleConnectionMetadataRecords',
  },
})
