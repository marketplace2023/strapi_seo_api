import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginSchedulerScheduler extends Schema.CollectionType {
  collectionName: 'scheduler_scheduler';
  info: {
    collectionName: 'scheduler';
    singularName: 'scheduler';
    pluralName: 'scheduler';
    displayName: 'scheduler';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    uid: Attribute.String & Attribute.Required;
    entryId: Attribute.BigInteger & Attribute.Required;
    type: Attribute.Enumeration<['publish', 'archive']> & Attribute.Required;
    datetime: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::scheduler.scheduler',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::scheduler.scheduler',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCitacionCitacion extends Schema.CollectionType {
  collectionName: 'citacions';
  info: {
    singularName: 'citacion';
    pluralName: 'citacions';
    displayName: 'Citacion';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    binglocal: Attribute.String;
    wheretoapp: Attribute.String;
    realtor: Attribute.String;
    foursquare: Attribute.String;
    client: Attribute.Relation<
      'api::citacion.citacion',
      'oneToOne',
      'api::client.client'
    >;
    zillow: Attribute.String;
    hotfrog: Attribute.String;
    experience: Attribute.String;
    merchantcircle: Attribute.String;
    storeboard: Attribute.String;
    brownbook: Attribute.String;
    twidloo: Attribute.String;
    cybo: Attribute.String;
    n49: Attribute.String;
    azbusinessfinder: Attribute.String;
    ailoq: Attribute.String;
    trepup: Attribute.String;
    yplocal: Attribute.String;
    osogbo: Attribute.String;
    citypages: Attribute.String;
    bpublic: Attribute.String;
    fixerhub: Attribute.String;
    quponing: Attribute.String;
    adlocalpages: Attribute.String;
    cleansway: Attribute.String;
    peeplocal: Attribute.String;
    businesssiccode: Attribute.String;
    usenrollbusiness: Attribute.String;
    trustlink: Attribute.String;
    freelistingusa: Attribute.String;
    techdirectory: Attribute.String;
    fyple: Attribute.String;
    akama: Attribute.String;
    startus: Attribute.String;
    yellowplace: Attribute.String;
    locable: Attribute.String;
    globalcatalog: Attribute.String;
    cityof: Attribute.String;
    findit: Attribute.String;
    dealerbaba: Attribute.String;
    anibookmark: Attribute.String;
    bizinfe: Attribute.String;
    yenino: Attribute.String;
    yoys: Attribute.String;
    qdexx: Attribute.String;
    fireflylisting: Attribute.String;
    bizista: Attribute.String;
    bizratings: Attribute.String;
    bubblelife: Attribute.String;
    citysquares: Attribute.String;
    cataloxy: Attribute.String;
    homepros411: Attribute.String;
    bizbangboom: Attribute.String;
    bizmaker: Attribute.String;
    onmap: Attribute.String;
    catskillonline: Attribute.String;
    iformative: Attribute.String;
    whatsyourhours: Attribute.String;
    announceamerica: Attribute.String;
    bizmakersamerica: Attribute.String;
    bizdiversitydirectory: Attribute.String;
    bestincom: Attribute.String;
    biztobiz: Attribute.String;
    earthmom: Attribute.String;
    directorios: Attribute.String;
    nextbizmaker: Attribute.String;
    askjaynee: Attribute.String;
    dobusinesslocal: Attribute.String;
    citylocalbiz: Attribute.String;
    itecfinder: Attribute.String;
    bizthistown: Attribute.String;
    mybizweb: Attribute.String;
    surpassconnect: Attribute.String;
    digitalbusinessdirectoryonline: Attribute.String;
    manta: Attribute.String;
    cgmimm: Attribute.String;
    freebusinessdirectory: Attribute.String;
    cityfs: Attribute.String;
    zipleaf: Attribute.String;
    findlocal: Attribute.String;
    ezlocal: Attribute.String;
    findthebiz: Attribute.String;
    linkcentre: Attribute.String;
    searchmonster: Attribute.String;
    provenexpert: Attribute.String;
    localbusinesslisting: Attribute.String;
    trueen: Attribute.String;
    smallbusinessusa: Attribute.String;
    verview: Attribute.String;
    residential: Attribute.String;
    fastexpert: Attribute.String;
    cylex: Attribute.String;
    yellowbot: Attribute.String;
    salespider: Attribute.String;
    infobel: Attribute.String;
    localstar: Attribute.String;
    ebusinesspages: Attribute.String;
    bippermedia: Attribute.String;
    homesandland: Attribute.String;
    localtips: Attribute.String;
    locnearme: Attribute.String;
    geebo: Attribute.String;
    ilisttech: Attribute.String;
    thedots: Attribute.String;
    tupalo: Attribute.String;
    justlanded: Attribute.String;
    apsense: Attribute.String;
    alladdress: Attribute.String;
    thecsraguides: Attribute.String;
    chamberofcommerce: Attribute.String;
    citiservi: Attribute.String;
    insertbiz: Attribute.String;
    agreatertown: Attribute.String;
    findopen: Attribute.String;
    usayellowpagesonline: Attribute.String;
    a4everyone: Attribute.String;
    bigbizstuff: Attribute.String;
    bizbacklinks: Attribute.String;
    bizbuildboom: Attribute.String;
    bizlinkbuilder: Attribute.String;
    blogbangboom: Attribute.String;
    smallbizblog: Attribute.String;
    thataiblog: Attribute.String;
    callupcontact: Attribute.String;
    findushere: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::citacion.citacion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::citacion.citacion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiClientClient extends Schema.CollectionType {
  collectionName: 'clients';
  info: {
    singularName: 'client';
    pluralName: 'clients';
    displayName: 'Client';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name_client: Attribute.String;
    phone_number_personal: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::client.client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::client.client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGbpGbp extends Schema.CollectionType {
  collectionName: 'gbps';
  info: {
    singularName: 'gbp';
    pluralName: 'gbps';
    displayName: 'GBP';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre_empresa: Attribute.String;
    tipo_de_negocio: Attribute.Enumeration<
      ['Venta minorista en l\u00EDnea', 'Tienda local', 'Empresa de servicios']
    >;
    correo_electronico: Attribute.Email;
    categoria_empresa: Attribute.String;
    areas_servicio: Attribute.String;
    numero_telefono: Attribute.String;
    sitio_web: Attribute.String;
    pais_region: Attribute.String;
    direccion: Attribute.String;
    ciudad: Attribute.String;
    estado: Attribute.String;
    codigo_postal: Attribute.String;
    horarios: Attribute.RichText;
    fotos_empresa: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    client: Attribute.Relation<
      'api::gbp.gbp',
      'oneToOne',
      'api::client.client'
    >;
    pinterest: Attribute.String;
    tiktok: Attribute.String;
    twitter: Attribute.String;
    youtube: Attribute.String;
    facebook: Attribute.String;
    instagram: Attribute.String;
    Linkedin: Attribute.String;
    descripcion_corta_empresa: Attribute.String;
    opiniones_de_clientes: Attribute.RichText;
    propiedades_destadas: Attribute.RichText;
    citas_y_contactos: Attribute.RichText;
    agencias_relacionadas: Attribute.RichText;
    metodos_de_pago: Attribute.RichText;
    hashtags: Attribute.RichText;
    keywords: Attribute.RichText;
    servicios_adicionales: Attribute.RichText;
    slogan: Attribute.String;
    inicio_de_operaciones: Attribute.String;
    certificaciones: Attribute.String;
    posicion: Attribute.String;
    descripcion: Attribute.RichText;
    descripcion_larga_empresa: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::gbp.gbp', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::gbp.gbp', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiMetricMetric extends Schema.CollectionType {
  collectionName: 'metrics';
  info: {
    singularName: 'metric';
    pluralName: 'metrics';
    displayName: 'Metric';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nap_consistency_brightlocal: Attribute.RichText;
    nap_consistency_google: Attribute.RichText;
    local_citations_quantity_brightlocal: Attribute.RichText;
    local_citations_quantity_google: Attribute.RichText;
    citation_quality_brightlocal: Attribute.RichText;
    citation_quality_google: Attribute.RichText;
    reviews_ratings_brightlocal: Attribute.RichText;
    reviews_ratings_google: Attribute.RichText;
    referring_traffic_citations_brightlocal: Attribute.RichText;
    referring_traffic_citations_google: Attribute.RichText;
    local_pack_ranking_brightlocal: Attribute.RichText;
    local_pack_ranking_google: Attribute.RichText;
    local_backlinks_brightlocal: Attribute.RichText;
    local_backlinks_google: Attribute.RichText;
    domain_authority_brightlocal: Attribute.RichText;
    domain_authority_google: Attribute.RichText;
    social_media_engagement_brightlocal: Attribute.RichText;
    social_media_engagement_google: Attribute.RichText;
    gmb_profile_visibility_brightlocal: Attribute.RichText;
    gmb_profile_visibility_google: Attribute.RichText;
    cta_clicks_brightlocal: Attribute.RichText;
    cta_clicks_google: Attribute.RichText;
    review_response_time_brightlocal: Attribute.RichText;
    review_response_time_google: Attribute.RichText;
    local_mentions_brightlocal: Attribute.RichText;
    local_mentions_google: Attribute.RichText;
    directory_listing_updates_brightlocal: Attribute.RichText;
    directory_listing_updates_google: Attribute.RichText;
    ctr_brightlocal: Attribute.RichText;
    ctr_google: Attribute.RichText;
    local_search_impressions_brightlocal: Attribute.RichText;
    local_search_impressions_google: Attribute.RichText;
    cliente: Attribute.Relation<
      'api::metric.metric',
      'oneToOne',
      'api::client.client'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::metric.metric',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::metric.metric',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNoticeClientNoticeClient extends Schema.CollectionType {
  collectionName: 'notice_clients';
  info: {
    singularName: 'notice-client';
    pluralName: 'notice-clients';
    displayName: 'Notice_Client';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cliente: Attribute.Relation<
      'api::notice-client.notice-client',
      'oneToOne',
      'api::client.client'
    >;
    titulo_articulo: Attribute.String;
    categoria: Attribute.String;
    fecha_publicacion: Attribute.DateTime;
    etiquetas: Attribute.RichText;
    contenido_del_articulo: Attribute.RichText;
    titulo_meta: Attribute.Text;
    meta_descripcion: Attribute.Text;
    palabras_clave_meta: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::notice-client.notice-client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::notice-client.notice-client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPostClientPostClient extends Schema.CollectionType {
  collectionName: 'post_clients';
  info: {
    singularName: 'post-client';
    pluralName: 'post-clients';
    displayName: 'Post_Client';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cliente: Attribute.Relation<
      'api::post-client.post-client',
      'oneToOne',
      'api::client.client'
    >;
    titulo_articulo: Attribute.String;
    aparece_en_inicio: Attribute.Boolean;
    categoria: Attribute.String;
    fecha_publicacion: Attribute.Date;
    etiquetas: Attribute.RichText;
    contenido_del_articulo: Attribute.RichText;
    titulo_meta: Attribute.Text;
    meta_descripcion: Attribute.Text;
    palabras_clave_meta: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::post-client.post-client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::post-client.post-client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductImageProductImage extends Schema.CollectionType {
  collectionName: 'product_images';
  info: {
    singularName: 'product-image';
    pluralName: 'product-images';
    displayName: 'product_image';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    cliente: Attribute.Relation<
      'api::product-image.product-image',
      'oneToOne',
      'api::client.client'
    >;
    imagenes: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product-image.product-image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product-image.product-image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiReviewClientReviewClient extends Schema.CollectionType {
  collectionName: 'review_clients';
  info: {
    singularName: 'review-client';
    pluralName: 'review-clients';
    displayName: 'Review_Client';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    publicar: Attribute.Boolean;
    nombre_album: Attribute.String;
    categoria: Attribute.String;
    etiquetas: Attribute.RichText;
    ingrese_descripcion: Attribute.RichText;
    titulo_meta: Attribute.Text;
    meta_descripcion: Attribute.RichText;
    palabras_clave_meta: Attribute.RichText;
    calificacion_experiencia: Attribute.RichText;
    cliente: Attribute.Relation<
      'api::review-client.review-client',
      'oneToOne',
      'api::client.client'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::review-client.review-client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::review-client.review-client',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTxtTxt extends Schema.CollectionType {
  collectionName: 'txts';
  info: {
    singularName: 'txt';
    pluralName: 'txts';
    displayName: 'Txt';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    client: Attribute.Relation<
      'api::txt.txt',
      'oneToOne',
      'api::client.client'
    >;
    nombre_empresa: Attribute.String;
    nombres: Attribute.String;
    apellidos: Attribute.String;
    correo_electronico: Attribute.Email;
    contrasena: Attribute.String;
    direccion: Attribute.Text;
    telefono: Attribute.String;
    posicion: Attribute.String;
    sitio_web: Attribute.String;
    redes_sociales: Attribute.RichText;
    slogan: Attribute.String;
    inicio_de_operaciones: Attribute.String;
    horarios: Attribute.RichText;
    metodos_de_pago: Attribute.RichText;
    certificaciones: Attribute.String;
    especialidades: Attribute.RichText;
    logros_premios: Attribute.String;
    descripcion_corta_empresa: Attribute.String;
    descripcion_larga_empresa: Attribute.RichText;
    keywords: Attribute.RichText;
    servicios: Attribute.RichText;
    hashtags: Attribute.RichText;
    areas_servicio: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::txt.txt', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::txt.txt', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::scheduler.scheduler': PluginSchedulerScheduler;
      'api::citacion.citacion': ApiCitacionCitacion;
      'api::client.client': ApiClientClient;
      'api::gbp.gbp': ApiGbpGbp;
      'api::metric.metric': ApiMetricMetric;
      'api::notice-client.notice-client': ApiNoticeClientNoticeClient;
      'api::post-client.post-client': ApiPostClientPostClient;
      'api::product-image.product-image': ApiProductImageProductImage;
      'api::review-client.review-client': ApiReviewClientReviewClient;
      'api::txt.txt': ApiTxtTxt;
    }
  }
}
