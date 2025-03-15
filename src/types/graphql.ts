import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigFloat: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  Date: { input: any; output: any; }
  Datetime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  Opaque: { input: any; output: any; }
  Time: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type BigFloatFilter = {
  eq?: InputMaybe<Scalars['BigFloat']['input']>;
  gt?: InputMaybe<Scalars['BigFloat']['input']>;
  gte?: InputMaybe<Scalars['BigFloat']['input']>;
  in?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigFloat']['input']>;
  lte?: InputMaybe<Scalars['BigFloat']['input']>;
  neq?: InputMaybe<Scalars['BigFloat']['input']>;
};

export type BigFloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigFloat']['input']>>;
};

export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']['input']>;
  gt?: InputMaybe<Scalars['BigInt']['input']>;
  gte?: InputMaybe<Scalars['BigInt']['input']>;
  in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']['input']>;
  lte?: InputMaybe<Scalars['BigInt']['input']>;
  neq?: InputMaybe<Scalars['BigInt']['input']>;
};

export type BigIntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eq?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  is?: InputMaybe<FilterIs>;
};

export type BooleanListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  contains?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  eq?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
};

export type DateListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Date']['input']>>;
  contains?: InputMaybe<Array<Scalars['Date']['input']>>;
  eq?: InputMaybe<Array<Scalars['Date']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Date']['input']>>;
};

export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']['input']>;
  gt?: InputMaybe<Scalars['Datetime']['input']>;
  gte?: InputMaybe<Scalars['Datetime']['input']>;
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']['input']>;
  lte?: InputMaybe<Scalars['Datetime']['input']>;
  neq?: InputMaybe<Scalars['Datetime']['input']>;
};

export type DatetimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  contains?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  eq?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

export type DeliveryLocation = Node & {
  __typename?: 'DeliveryLocation';
  address: Scalars['String']['output'];
  address1?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  endOpenTime?: Maybe<Scalars['Opaque']['output']>;
  id: Scalars['UUID']['output'];
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  nodeId: Scalars['ID']['output'];
  startOpenTime?: Maybe<Scalars['Opaque']['output']>;
  state: Scalars['String']['output'];
  stationDeliveryLocationsCollection?: Maybe<StationDeliveryLocationsConnection>;
  zip: Scalars['String']['output'];
};


export type DeliveryLocationStationDeliveryLocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<StationDeliveryLocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StationDeliveryLocationsOrderBy>>;
};

export type DeliveryLocationConnection = {
  __typename?: 'DeliveryLocationConnection';
  edges: Array<DeliveryLocationEdge>;
  pageInfo: PageInfo;
};

export type DeliveryLocationDeleteResponse = {
  __typename?: 'DeliveryLocationDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<DeliveryLocation>;
};

export type DeliveryLocationEdge = {
  __typename?: 'DeliveryLocationEdge';
  cursor: Scalars['String']['output'];
  node: DeliveryLocation;
};

export type DeliveryLocationFilter = {
  address?: InputMaybe<StringFilter>;
  address1?: InputMaybe<StringFilter>;
  and?: InputMaybe<Array<DeliveryLocationFilter>>;
  city?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  endOpenTime?: InputMaybe<OpaqueFilter>;
  id?: InputMaybe<UuidFilter>;
  latitude?: InputMaybe<FloatFilter>;
  longitude?: InputMaybe<FloatFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<DeliveryLocationFilter>;
  or?: InputMaybe<Array<DeliveryLocationFilter>>;
  startOpenTime?: InputMaybe<OpaqueFilter>;
  state?: InputMaybe<StringFilter>;
  zip?: InputMaybe<StringFilter>;
};

export type DeliveryLocationInsertInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  address1?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  endOpenTime?: InputMaybe<Scalars['Opaque']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startOpenTime?: InputMaybe<Scalars['Opaque']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type DeliveryLocationInsertResponse = {
  __typename?: 'DeliveryLocationInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<DeliveryLocation>;
};

export type DeliveryLocationOrderBy = {
  address?: InputMaybe<OrderByDirection>;
  address1?: InputMaybe<OrderByDirection>;
  city?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  endOpenTime?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  latitude?: InputMaybe<OrderByDirection>;
  longitude?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  startOpenTime?: InputMaybe<OrderByDirection>;
  state?: InputMaybe<OrderByDirection>;
  zip?: InputMaybe<OrderByDirection>;
};

export type DeliveryLocationUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  address1?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  endOpenTime?: InputMaybe<Scalars['Opaque']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startOpenTime?: InputMaybe<Scalars['Opaque']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type DeliveryLocationUpdateResponse = {
  __typename?: 'DeliveryLocationUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<DeliveryLocation>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

export type FloatListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Float']['input']>>;
  contains?: InputMaybe<Array<Scalars['Float']['input']>>;
  eq?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']['input']>;
};

export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
};

export type IntListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Int']['input']>>;
  contains?: InputMaybe<Array<Scalars['Int']['input']>>;
  eq?: InputMaybe<Array<Scalars['Int']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteFromDeliveryLocationCollection: DeliveryLocationDeleteResponse;
  deleteFromNavigationCollection: NavigationDeleteResponse;
  deleteFromNavigationItemsCollection: NavigationItemsDeleteResponse;
  deleteFromNotificationTypesCollection: NotificationTypesDeleteResponse;
  deleteFromNotificationsCollection: NotificationsDeleteResponse;
  deleteFromOrderItemsCollection: OrderItemsDeleteResponse;
  deleteFromOrderTransactionsCollection: OrderTransactionsDeleteResponse;
  deleteFromOrdersCollection: OrdersDeleteResponse;
  deleteFromPermissionsCollection: PermissionsDeleteResponse;
  deleteFromProductInventoryCollection: ProductInventoryDeleteResponse;
  deleteFromProductTypesCollection: ProductTypesDeleteResponse;
  deleteFromProductsCollection: ProductsDeleteResponse;
  deleteFromRolePermissionsCollection: RolePermissionsDeleteResponse;
  deleteFromRolesCollection: RolesDeleteResponse;
  deleteFromSessionsCollection: SessionsDeleteResponse;
  deleteFromShoppingCartItemsCollection: ShoppingCartItemsDeleteResponse;
  deleteFromShoppingCartsCollection: ShoppingCartsDeleteResponse;
  deleteFromStationDeliveryLocationTimeslotsCollection: StationDeliveryLocationTimeslotsDeleteResponse;
  deleteFromStationDeliveryLocationsCollection: StationDeliveryLocationsDeleteResponse;
  deleteFromStationsCollection: StationsDeleteResponse;
  deleteFromUserPermissionsCollection: UserPermissionsDeleteResponse;
  deleteFromUserRolesCollection: UserRolesDeleteResponse;
  deleteFromUserStationsCollection: UserStationsDeleteResponse;
  deleteFromUsersCollection: UsersDeleteResponse;
  insertIntoDeliveryLocationCollection?: Maybe<DeliveryLocationInsertResponse>;
  insertIntoNavigationCollection?: Maybe<NavigationInsertResponse>;
  insertIntoNavigationItemsCollection?: Maybe<NavigationItemsInsertResponse>;
  insertIntoNotificationTypesCollection?: Maybe<NotificationTypesInsertResponse>;
  insertIntoNotificationsCollection?: Maybe<NotificationsInsertResponse>;
  insertIntoOrderItemsCollection?: Maybe<OrderItemsInsertResponse>;
  insertIntoOrderTransactionsCollection?: Maybe<OrderTransactionsInsertResponse>;
  insertIntoOrdersCollection?: Maybe<OrdersInsertResponse>;
  insertIntoPermissionsCollection?: Maybe<PermissionsInsertResponse>;
  insertIntoProductInventoryCollection?: Maybe<ProductInventoryInsertResponse>;
  insertIntoProductTypesCollection?: Maybe<ProductTypesInsertResponse>;
  insertIntoProductsCollection?: Maybe<ProductsInsertResponse>;
  insertIntoRolePermissionsCollection?: Maybe<RolePermissionsInsertResponse>;
  insertIntoRolesCollection?: Maybe<RolesInsertResponse>;
  insertIntoSessionsCollection?: Maybe<SessionsInsertResponse>;
  insertIntoShoppingCartItemsCollection?: Maybe<ShoppingCartItemsInsertResponse>;
  insertIntoShoppingCartsCollection?: Maybe<ShoppingCartsInsertResponse>;
  insertIntoStationDeliveryLocationTimeslotsCollection?: Maybe<StationDeliveryLocationTimeslotsInsertResponse>;
  insertIntoStationDeliveryLocationsCollection?: Maybe<StationDeliveryLocationsInsertResponse>;
  insertIntoStationsCollection?: Maybe<StationsInsertResponse>;
  insertIntoUserPermissionsCollection?: Maybe<UserPermissionsInsertResponse>;
  insertIntoUserRolesCollection?: Maybe<UserRolesInsertResponse>;
  insertIntoUserStationsCollection?: Maybe<UserStationsInsertResponse>;
  insertIntoUsersCollection?: Maybe<UsersInsertResponse>;
  updateDeliveryLocationCollection: DeliveryLocationUpdateResponse;
  updateNavigationCollection: NavigationUpdateResponse;
  updateNavigationItemsCollection: NavigationItemsUpdateResponse;
  updateNotificationTypesCollection: NotificationTypesUpdateResponse;
  updateNotificationsCollection: NotificationsUpdateResponse;
  updateOrderItemsCollection: OrderItemsUpdateResponse;
  updateOrderTransactionsCollection: OrderTransactionsUpdateResponse;
  updateOrdersCollection: OrdersUpdateResponse;
  updatePermissionsCollection: PermissionsUpdateResponse;
  updateProductInventoryCollection: ProductInventoryUpdateResponse;
  updateProductTypesCollection: ProductTypesUpdateResponse;
  updateProductsCollection: ProductsUpdateResponse;
  updateRolePermissionsCollection: RolePermissionsUpdateResponse;
  updateRolesCollection: RolesUpdateResponse;
  updateSessionsCollection: SessionsUpdateResponse;
  updateShoppingCartItemsCollection: ShoppingCartItemsUpdateResponse;
  updateShoppingCartsCollection: ShoppingCartsUpdateResponse;
  updateStationDeliveryLocationTimeslotsCollection: StationDeliveryLocationTimeslotsUpdateResponse;
  updateStationDeliveryLocationsCollection: StationDeliveryLocationsUpdateResponse;
  updateStationsCollection: StationsUpdateResponse;
  updateUserPermissionsCollection: UserPermissionsUpdateResponse;
  updateUserRolesCollection: UserRolesUpdateResponse;
  updateUserStationsCollection: UserStationsUpdateResponse;
  updateUsersCollection: UsersUpdateResponse;
};


export type MutationDeleteFromDeliveryLocationCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<DeliveryLocationFilter>;
};


export type MutationDeleteFromNavigationCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NavigationFilter>;
};


export type MutationDeleteFromNavigationItemsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NavigationItemsFilter>;
};


export type MutationDeleteFromNotificationTypesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotificationTypesFilter>;
};


export type MutationDeleteFromNotificationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotificationsFilter>;
};


export type MutationDeleteFromOrderItemsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<OrderItemsFilter>;
};


export type MutationDeleteFromOrderTransactionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<OrderTransactionsFilter>;
};


export type MutationDeleteFromOrdersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<OrdersFilter>;
};


export type MutationDeleteFromPermissionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<PermissionsFilter>;
};


export type MutationDeleteFromProductInventoryCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProductInventoryFilter>;
};


export type MutationDeleteFromProductTypesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProductTypesFilter>;
};


export type MutationDeleteFromProductsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProductsFilter>;
};


export type MutationDeleteFromRolePermissionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RolePermissionsFilter>;
};


export type MutationDeleteFromRolesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RolesFilter>;
};


export type MutationDeleteFromSessionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<SessionsFilter>;
};


export type MutationDeleteFromShoppingCartItemsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ShoppingCartItemsFilter>;
};


export type MutationDeleteFromShoppingCartsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ShoppingCartsFilter>;
};


export type MutationDeleteFromStationDeliveryLocationTimeslotsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<StationDeliveryLocationTimeslotsFilter>;
};


export type MutationDeleteFromStationDeliveryLocationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<StationDeliveryLocationsFilter>;
};


export type MutationDeleteFromStationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<StationsFilter>;
};


export type MutationDeleteFromUserPermissionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UserPermissionsFilter>;
};


export type MutationDeleteFromUserRolesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UserRolesFilter>;
};


export type MutationDeleteFromUserStationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UserStationsFilter>;
};


export type MutationDeleteFromUsersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UsersFilter>;
};


export type MutationInsertIntoDeliveryLocationCollectionArgs = {
  objects: Array<DeliveryLocationInsertInput>;
};


export type MutationInsertIntoNavigationCollectionArgs = {
  objects: Array<NavigationInsertInput>;
};


export type MutationInsertIntoNavigationItemsCollectionArgs = {
  objects: Array<NavigationItemsInsertInput>;
};


export type MutationInsertIntoNotificationTypesCollectionArgs = {
  objects: Array<NotificationTypesInsertInput>;
};


export type MutationInsertIntoNotificationsCollectionArgs = {
  objects: Array<NotificationsInsertInput>;
};


export type MutationInsertIntoOrderItemsCollectionArgs = {
  objects: Array<OrderItemsInsertInput>;
};


export type MutationInsertIntoOrderTransactionsCollectionArgs = {
  objects: Array<OrderTransactionsInsertInput>;
};


export type MutationInsertIntoOrdersCollectionArgs = {
  objects: Array<OrdersInsertInput>;
};


export type MutationInsertIntoPermissionsCollectionArgs = {
  objects: Array<PermissionsInsertInput>;
};


export type MutationInsertIntoProductInventoryCollectionArgs = {
  objects: Array<ProductInventoryInsertInput>;
};


export type MutationInsertIntoProductTypesCollectionArgs = {
  objects: Array<ProductTypesInsertInput>;
};


export type MutationInsertIntoProductsCollectionArgs = {
  objects: Array<ProductsInsertInput>;
};


export type MutationInsertIntoRolePermissionsCollectionArgs = {
  objects: Array<RolePermissionsInsertInput>;
};


export type MutationInsertIntoRolesCollectionArgs = {
  objects: Array<RolesInsertInput>;
};


export type MutationInsertIntoSessionsCollectionArgs = {
  objects: Array<SessionsInsertInput>;
};


export type MutationInsertIntoShoppingCartItemsCollectionArgs = {
  objects: Array<ShoppingCartItemsInsertInput>;
};


export type MutationInsertIntoShoppingCartsCollectionArgs = {
  objects: Array<ShoppingCartsInsertInput>;
};


export type MutationInsertIntoStationDeliveryLocationTimeslotsCollectionArgs = {
  objects: Array<StationDeliveryLocationTimeslotsInsertInput>;
};


export type MutationInsertIntoStationDeliveryLocationsCollectionArgs = {
  objects: Array<StationDeliveryLocationsInsertInput>;
};


export type MutationInsertIntoStationsCollectionArgs = {
  objects: Array<StationsInsertInput>;
};


export type MutationInsertIntoUserPermissionsCollectionArgs = {
  objects: Array<UserPermissionsInsertInput>;
};


export type MutationInsertIntoUserRolesCollectionArgs = {
  objects: Array<UserRolesInsertInput>;
};


export type MutationInsertIntoUserStationsCollectionArgs = {
  objects: Array<UserStationsInsertInput>;
};


export type MutationInsertIntoUsersCollectionArgs = {
  objects: Array<UsersInsertInput>;
};


export type MutationUpdateDeliveryLocationCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<DeliveryLocationFilter>;
  set: DeliveryLocationUpdateInput;
};


export type MutationUpdateNavigationCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NavigationFilter>;
  set: NavigationUpdateInput;
};


export type MutationUpdateNavigationItemsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NavigationItemsFilter>;
  set: NavigationItemsUpdateInput;
};


export type MutationUpdateNotificationTypesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotificationTypesFilter>;
  set: NotificationTypesUpdateInput;
};


export type MutationUpdateNotificationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<NotificationsFilter>;
  set: NotificationsUpdateInput;
};


export type MutationUpdateOrderItemsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<OrderItemsFilter>;
  set: OrderItemsUpdateInput;
};


export type MutationUpdateOrderTransactionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<OrderTransactionsFilter>;
  set: OrderTransactionsUpdateInput;
};


export type MutationUpdateOrdersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<OrdersFilter>;
  set: OrdersUpdateInput;
};


export type MutationUpdatePermissionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<PermissionsFilter>;
  set: PermissionsUpdateInput;
};


export type MutationUpdateProductInventoryCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProductInventoryFilter>;
  set: ProductInventoryUpdateInput;
};


export type MutationUpdateProductTypesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProductTypesFilter>;
  set: ProductTypesUpdateInput;
};


export type MutationUpdateProductsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ProductsFilter>;
  set: ProductsUpdateInput;
};


export type MutationUpdateRolePermissionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RolePermissionsFilter>;
  set: RolePermissionsUpdateInput;
};


export type MutationUpdateRolesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<RolesFilter>;
  set: RolesUpdateInput;
};


export type MutationUpdateSessionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<SessionsFilter>;
  set: SessionsUpdateInput;
};


export type MutationUpdateShoppingCartItemsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ShoppingCartItemsFilter>;
  set: ShoppingCartItemsUpdateInput;
};


export type MutationUpdateShoppingCartsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<ShoppingCartsFilter>;
  set: ShoppingCartsUpdateInput;
};


export type MutationUpdateStationDeliveryLocationTimeslotsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<StationDeliveryLocationTimeslotsFilter>;
  set: StationDeliveryLocationTimeslotsUpdateInput;
};


export type MutationUpdateStationDeliveryLocationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<StationDeliveryLocationsFilter>;
  set: StationDeliveryLocationsUpdateInput;
};


export type MutationUpdateStationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<StationsFilter>;
  set: StationsUpdateInput;
};


export type MutationUpdateUserPermissionsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UserPermissionsFilter>;
  set: UserPermissionsUpdateInput;
};


export type MutationUpdateUserRolesCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UserRolesFilter>;
  set: UserRolesUpdateInput;
};


export type MutationUpdateUserStationsCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UserStationsFilter>;
  set: UserStationsUpdateInput;
};


export type MutationUpdateUsersCollectionArgs = {
  atMost?: Scalars['Int']['input'];
  filter?: InputMaybe<UsersFilter>;
  set: UsersUpdateInput;
};

export type Navigation = Node & {
  __typename?: 'Navigation';
  createdAt: Scalars['Datetime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['UUID']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  navigationItemsCollection?: Maybe<NavigationItemsConnection>;
  nodeId: Scalars['ID']['output'];
};


export type NavigationNavigationItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NavigationItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NavigationItemsOrderBy>>;
};

export type NavigationConnection = {
  __typename?: 'NavigationConnection';
  edges: Array<NavigationEdge>;
  pageInfo: PageInfo;
};

export type NavigationDeleteResponse = {
  __typename?: 'NavigationDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Navigation>;
};

export type NavigationEdge = {
  __typename?: 'NavigationEdge';
  cursor: Scalars['String']['output'];
  node: Navigation;
};

export type NavigationFilter = {
  and?: InputMaybe<Array<NavigationFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  key?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<NavigationFilter>;
  or?: InputMaybe<Array<NavigationFilter>>;
};

export type NavigationInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type NavigationInsertResponse = {
  __typename?: 'NavigationInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Navigation>;
};

export type NavigationItems = Node & {
  __typename?: 'NavigationItems';
  createdAt: Scalars['Datetime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  iconName?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  index: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  navigation: Navigation;
  navigationId: Scalars['UUID']['output'];
  navigationItemsCollection?: Maybe<NavigationItemsConnection>;
  nodeId: Scalars['ID']['output'];
  parent?: Maybe<NavigationItems>;
  parentId?: Maybe<Scalars['UUID']['output']>;
  path: Scalars['String']['output'];
  roles?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  tag: Scalars['String']['output'];
};


export type NavigationItemsNavigationItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NavigationItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NavigationItemsOrderBy>>;
};

export type NavigationItemsConnection = {
  __typename?: 'NavigationItemsConnection';
  edges: Array<NavigationItemsEdge>;
  pageInfo: PageInfo;
};

export type NavigationItemsDeleteResponse = {
  __typename?: 'NavigationItemsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<NavigationItems>;
};

export type NavigationItemsEdge = {
  __typename?: 'NavigationItemsEdge';
  cursor: Scalars['String']['output'];
  node: NavigationItems;
};

export type NavigationItemsFilter = {
  and?: InputMaybe<Array<NavigationItemsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  iconName?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  index?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  navigationId?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<NavigationItemsFilter>;
  or?: InputMaybe<Array<NavigationItemsFilter>>;
  parentId?: InputMaybe<UuidFilter>;
  path?: InputMaybe<StringFilter>;
  roles?: InputMaybe<StringListFilter>;
  tag?: InputMaybe<StringFilter>;
};

export type NavigationItemsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  iconName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  navigationId?: InputMaybe<Scalars['UUID']['input']>;
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag?: InputMaybe<Scalars['String']['input']>;
};

export type NavigationItemsInsertResponse = {
  __typename?: 'NavigationItemsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<NavigationItems>;
};

export type NavigationItemsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  iconName?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  index?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  navigationId?: InputMaybe<OrderByDirection>;
  parentId?: InputMaybe<OrderByDirection>;
  path?: InputMaybe<OrderByDirection>;
  tag?: InputMaybe<OrderByDirection>;
};

export type NavigationItemsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  iconName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  navigationId?: InputMaybe<Scalars['UUID']['input']>;
  parentId?: InputMaybe<Scalars['UUID']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tag?: InputMaybe<Scalars['String']['input']>;
};

export type NavigationItemsUpdateResponse = {
  __typename?: 'NavigationItemsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<NavigationItems>;
};

export type NavigationOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  key?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type NavigationUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type NavigationUpdateResponse = {
  __typename?: 'NavigationUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Navigation>;
};

export type Node = {
  nodeId: Scalars['ID']['output'];
};

export type NotificationTypes = Node & {
  __typename?: 'NotificationTypes';
  createdAt: Scalars['Datetime']['output'];
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nodeId: Scalars['ID']['output'];
  notificationsCollection?: Maybe<NotificationsConnection>;
  schema?: Maybe<Scalars['JSON']['output']>;
};


export type NotificationTypesNotificationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NotificationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NotificationsOrderBy>>;
};

export type NotificationTypesConnection = {
  __typename?: 'NotificationTypesConnection';
  edges: Array<NotificationTypesEdge>;
  pageInfo: PageInfo;
};

export type NotificationTypesDeleteResponse = {
  __typename?: 'NotificationTypesDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<NotificationTypes>;
};

export type NotificationTypesEdge = {
  __typename?: 'NotificationTypesEdge';
  cursor: Scalars['String']['output'];
  node: NotificationTypes;
};

export type NotificationTypesFilter = {
  and?: InputMaybe<Array<NotificationTypesFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  iconUrl?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  key?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<NotificationTypesFilter>;
  or?: InputMaybe<Array<NotificationTypesFilter>>;
};

export type NotificationTypesInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  schema?: InputMaybe<Scalars['JSON']['input']>;
};

export type NotificationTypesInsertResponse = {
  __typename?: 'NotificationTypesInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<NotificationTypes>;
};

export type NotificationTypesOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  iconUrl?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  key?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type NotificationTypesUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  schema?: InputMaybe<Scalars['JSON']['input']>;
};

export type NotificationTypesUpdateResponse = {
  __typename?: 'NotificationTypesUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<NotificationTypes>;
};

export type Notifications = Node & {
  __typename?: 'Notifications';
  createdAt: Scalars['Datetime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  isRead: Scalars['Boolean']['output'];
  messageMarkdown?: Maybe<Scalars['String']['output']>;
  nodeId: Scalars['ID']['output'];
  notificationType: NotificationTypes;
  notificationTypeId: Scalars['UUID']['output'];
  subtitle: Scalars['String']['output'];
  title: Scalars['String']['output'];
  user: Users;
  userId: Scalars['UUID']['output'];
};

export type NotificationsConnection = {
  __typename?: 'NotificationsConnection';
  edges: Array<NotificationsEdge>;
  pageInfo: PageInfo;
};

export type NotificationsDeleteResponse = {
  __typename?: 'NotificationsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Notifications>;
};

export type NotificationsEdge = {
  __typename?: 'NotificationsEdge';
  cursor: Scalars['String']['output'];
  node: Notifications;
};

export type NotificationsFilter = {
  and?: InputMaybe<Array<NotificationsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  iconUrl?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  isRead?: InputMaybe<BooleanFilter>;
  messageMarkdown?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<NotificationsFilter>;
  notificationTypeId?: InputMaybe<UuidFilter>;
  or?: InputMaybe<Array<NotificationsFilter>>;
  subtitle?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type NotificationsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  messageMarkdown?: InputMaybe<Scalars['String']['input']>;
  notificationTypeId?: InputMaybe<Scalars['UUID']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type NotificationsInsertResponse = {
  __typename?: 'NotificationsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Notifications>;
};

export type NotificationsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  iconUrl?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  isRead?: InputMaybe<OrderByDirection>;
  messageMarkdown?: InputMaybe<OrderByDirection>;
  notificationTypeId?: InputMaybe<OrderByDirection>;
  subtitle?: InputMaybe<OrderByDirection>;
  title?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type NotificationsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  messageMarkdown?: InputMaybe<Scalars['String']['input']>;
  notificationTypeId?: InputMaybe<Scalars['UUID']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type NotificationsUpdateResponse = {
  __typename?: 'NotificationsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Notifications>;
};

export type OpaqueFilter = {
  eq?: InputMaybe<Scalars['Opaque']['input']>;
  is?: InputMaybe<FilterIs>;
};

export enum OrderByDirection {
  AscNullsFirst = 'AscNullsFirst',
  AscNullsLast = 'AscNullsLast',
  DescNullsFirst = 'DescNullsFirst',
  DescNullsLast = 'DescNullsLast'
}

export type OrderItems = Node & {
  __typename?: 'OrderItems';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  nodeId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  order: Orders;
  orderId: Scalars['UUID']['output'];
  product?: Maybe<Products>;
  productId?: Maybe<Scalars['UUID']['output']>;
  quantity: Scalars['Int']['output'];
  unitPrice: Scalars['Float']['output'];
};

export type OrderItemsConnection = {
  __typename?: 'OrderItemsConnection';
  edges: Array<OrderItemsEdge>;
  pageInfo: PageInfo;
};

export type OrderItemsDeleteResponse = {
  __typename?: 'OrderItemsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<OrderItems>;
};

export type OrderItemsEdge = {
  __typename?: 'OrderItemsEdge';
  cursor: Scalars['String']['output'];
  node: OrderItems;
};

export type OrderItemsFilter = {
  and?: InputMaybe<Array<OrderItemsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<OrderItemsFilter>;
  notes?: InputMaybe<StringFilter>;
  or?: InputMaybe<Array<OrderItemsFilter>>;
  orderId?: InputMaybe<UuidFilter>;
  productId?: InputMaybe<UuidFilter>;
  quantity?: InputMaybe<IntFilter>;
  unitPrice?: InputMaybe<FloatFilter>;
};

export type OrderItemsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type OrderItemsInsertResponse = {
  __typename?: 'OrderItemsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<OrderItems>;
};

export type OrderItemsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  notes?: InputMaybe<OrderByDirection>;
  orderId?: InputMaybe<OrderByDirection>;
  productId?: InputMaybe<OrderByDirection>;
  quantity?: InputMaybe<OrderByDirection>;
  unitPrice?: InputMaybe<OrderByDirection>;
};

export type OrderItemsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type OrderItemsUpdateResponse = {
  __typename?: 'OrderItemsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<OrderItems>;
};

export enum OrderStatus {
  Canceled = 'canceled',
  Delivered = 'delivered',
  Error = 'error',
  InProgress = 'in_progress',
  Made = 'made',
  OutForDelivery = 'out_for_delivery',
  Placed = 'placed'
}

export type OrderStatusFilter = {
  eq?: InputMaybe<OrderStatus>;
  in?: InputMaybe<Array<OrderStatus>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<OrderStatus>;
};

export type OrderTransactions = Node & {
  __typename?: 'OrderTransactions';
  amount: Scalars['Float']['output'];
  ccCard: Scalars['String']['output'];
  ccLast4: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  nodeId: Scalars['ID']['output'];
  order: Orders;
  orderId: Scalars['UUID']['output'];
  payerTransactionId?: Maybe<Scalars['String']['output']>;
  succeeded: Scalars['Boolean']['output'];
};

export type OrderTransactionsConnection = {
  __typename?: 'OrderTransactionsConnection';
  edges: Array<OrderTransactionsEdge>;
  pageInfo: PageInfo;
};

export type OrderTransactionsDeleteResponse = {
  __typename?: 'OrderTransactionsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<OrderTransactions>;
};

export type OrderTransactionsEdge = {
  __typename?: 'OrderTransactionsEdge';
  cursor: Scalars['String']['output'];
  node: OrderTransactions;
};

export type OrderTransactionsFilter = {
  amount?: InputMaybe<FloatFilter>;
  and?: InputMaybe<Array<OrderTransactionsFilter>>;
  ccCard?: InputMaybe<StringFilter>;
  ccLast4?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  error?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<OrderTransactionsFilter>;
  or?: InputMaybe<Array<OrderTransactionsFilter>>;
  orderId?: InputMaybe<UuidFilter>;
  payerTransactionId?: InputMaybe<StringFilter>;
  succeeded?: InputMaybe<BooleanFilter>;
};

export type OrderTransactionsInsertInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  ccCard?: InputMaybe<Scalars['String']['input']>;
  ccLast4?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  orderId?: InputMaybe<Scalars['UUID']['input']>;
  payerTransactionId?: InputMaybe<Scalars['String']['input']>;
  succeeded?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrderTransactionsInsertResponse = {
  __typename?: 'OrderTransactionsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<OrderTransactions>;
};

export type OrderTransactionsOrderBy = {
  amount?: InputMaybe<OrderByDirection>;
  ccCard?: InputMaybe<OrderByDirection>;
  ccLast4?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  error?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  orderId?: InputMaybe<OrderByDirection>;
  payerTransactionId?: InputMaybe<OrderByDirection>;
  succeeded?: InputMaybe<OrderByDirection>;
};

export type OrderTransactionsUpdateInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  ccCard?: InputMaybe<Scalars['String']['input']>;
  ccLast4?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  error?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  orderId?: InputMaybe<Scalars['UUID']['input']>;
  payerTransactionId?: InputMaybe<Scalars['String']['input']>;
  succeeded?: InputMaybe<Scalars['Boolean']['input']>;
};

export type OrderTransactionsUpdateResponse = {
  __typename?: 'OrderTransactionsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<OrderTransactions>;
};

export type Orders = Node & {
  __typename?: 'Orders';
  createdAt: Scalars['Datetime']['output'];
  deliveryAddress?: Maybe<Scalars['String']['output']>;
  deliveryAddress1?: Maybe<Scalars['String']['output']>;
  deliveryCity?: Maybe<Scalars['String']['output']>;
  deliveryLat?: Maybe<Scalars['Float']['output']>;
  deliveryLocationName?: Maybe<Scalars['String']['output']>;
  deliveryLong?: Maybe<Scalars['Float']['output']>;
  deliveryState?: Maybe<Scalars['String']['output']>;
  deliveryZip?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  nodeId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  orderItemsCollection?: Maybe<OrderItemsConnection>;
  orderStatus: OrderStatus;
  orderTransactionsCollection?: Maybe<OrderTransactionsConnection>;
  scheduledDeliveryAt?: Maybe<Scalars['Datetime']['output']>;
  shoppingCartsCollection?: Maybe<ShoppingCartsConnection>;
  subtotal?: Maybe<Scalars['BigFloat']['output']>;
  tax?: Maybe<Scalars['BigFloat']['output']>;
  total?: Maybe<Scalars['BigFloat']['output']>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  user: Users;
  userId: Scalars['UUID']['output'];
};


export type OrdersOrderItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<OrderItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrderItemsOrderBy>>;
};


export type OrdersOrderTransactionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<OrderTransactionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrderTransactionsOrderBy>>;
};


export type OrdersShoppingCartsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ShoppingCartsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShoppingCartsOrderBy>>;
};

export type OrdersConnection = {
  __typename?: 'OrdersConnection';
  edges: Array<OrdersEdge>;
  pageInfo: PageInfo;
};

export type OrdersDeleteResponse = {
  __typename?: 'OrdersDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Orders>;
};

export type OrdersEdge = {
  __typename?: 'OrdersEdge';
  cursor: Scalars['String']['output'];
  node: Orders;
};

export type OrdersFilter = {
  and?: InputMaybe<Array<OrdersFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  deliveryAddress?: InputMaybe<StringFilter>;
  deliveryAddress1?: InputMaybe<StringFilter>;
  deliveryCity?: InputMaybe<StringFilter>;
  deliveryLat?: InputMaybe<FloatFilter>;
  deliveryLocationName?: InputMaybe<StringFilter>;
  deliveryLong?: InputMaybe<FloatFilter>;
  deliveryState?: InputMaybe<StringFilter>;
  deliveryZip?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<OrdersFilter>;
  notes?: InputMaybe<StringFilter>;
  or?: InputMaybe<Array<OrdersFilter>>;
  orderStatus?: InputMaybe<OrderStatusFilter>;
  scheduledDeliveryAt?: InputMaybe<DatetimeFilter>;
  subtotal?: InputMaybe<BigFloatFilter>;
  tax?: InputMaybe<BigFloatFilter>;
  total?: InputMaybe<BigFloatFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type OrdersInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  deliveryAddress?: InputMaybe<Scalars['String']['input']>;
  deliveryAddress1?: InputMaybe<Scalars['String']['input']>;
  deliveryCity?: InputMaybe<Scalars['String']['input']>;
  deliveryLat?: InputMaybe<Scalars['Float']['input']>;
  deliveryLocationName?: InputMaybe<Scalars['String']['input']>;
  deliveryLong?: InputMaybe<Scalars['Float']['input']>;
  deliveryState?: InputMaybe<Scalars['String']['input']>;
  deliveryZip?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  orderStatus?: InputMaybe<OrderStatus>;
  scheduledDeliveryAt?: InputMaybe<Scalars['Datetime']['input']>;
  subtotal?: InputMaybe<Scalars['BigFloat']['input']>;
  tax?: InputMaybe<Scalars['BigFloat']['input']>;
  total?: InputMaybe<Scalars['BigFloat']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type OrdersInsertResponse = {
  __typename?: 'OrdersInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Orders>;
};

export type OrdersOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  deliveryAddress?: InputMaybe<OrderByDirection>;
  deliveryAddress1?: InputMaybe<OrderByDirection>;
  deliveryCity?: InputMaybe<OrderByDirection>;
  deliveryLat?: InputMaybe<OrderByDirection>;
  deliveryLocationName?: InputMaybe<OrderByDirection>;
  deliveryLong?: InputMaybe<OrderByDirection>;
  deliveryState?: InputMaybe<OrderByDirection>;
  deliveryZip?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  notes?: InputMaybe<OrderByDirection>;
  orderStatus?: InputMaybe<OrderByDirection>;
  scheduledDeliveryAt?: InputMaybe<OrderByDirection>;
  subtotal?: InputMaybe<OrderByDirection>;
  tax?: InputMaybe<OrderByDirection>;
  total?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type OrdersUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  deliveryAddress?: InputMaybe<Scalars['String']['input']>;
  deliveryAddress1?: InputMaybe<Scalars['String']['input']>;
  deliveryCity?: InputMaybe<Scalars['String']['input']>;
  deliveryLat?: InputMaybe<Scalars['Float']['input']>;
  deliveryLocationName?: InputMaybe<Scalars['String']['input']>;
  deliveryLong?: InputMaybe<Scalars['Float']['input']>;
  deliveryState?: InputMaybe<Scalars['String']['input']>;
  deliveryZip?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  orderStatus?: InputMaybe<OrderStatus>;
  scheduledDeliveryAt?: InputMaybe<Scalars['Datetime']['input']>;
  subtotal?: InputMaybe<Scalars['BigFloat']['input']>;
  tax?: InputMaybe<Scalars['BigFloat']['input']>;
  total?: InputMaybe<Scalars['BigFloat']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type OrdersUpdateResponse = {
  __typename?: 'OrdersUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Orders>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Permissions = Node & {
  __typename?: 'Permissions';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  key: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  nodeId: Scalars['ID']['output'];
  rolePermissionsCollection?: Maybe<RolePermissionsConnection>;
  userPermissionsCollection?: Maybe<UserPermissionsConnection>;
};


export type PermissionsRolePermissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RolePermissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RolePermissionsOrderBy>>;
};


export type PermissionsUserPermissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UserPermissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserPermissionsOrderBy>>;
};

export type PermissionsConnection = {
  __typename?: 'PermissionsConnection';
  edges: Array<PermissionsEdge>;
  pageInfo: PageInfo;
};

export type PermissionsDeleteResponse = {
  __typename?: 'PermissionsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Permissions>;
};

export type PermissionsEdge = {
  __typename?: 'PermissionsEdge';
  cursor: Scalars['String']['output'];
  node: Permissions;
};

export type PermissionsFilter = {
  and?: InputMaybe<Array<PermissionsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  key?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<PermissionsFilter>;
  or?: InputMaybe<Array<PermissionsFilter>>;
};

export type PermissionsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type PermissionsInsertResponse = {
  __typename?: 'PermissionsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Permissions>;
};

export type PermissionsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  key?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type PermissionsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type PermissionsUpdateResponse = {
  __typename?: 'PermissionsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Permissions>;
};

export type ProductInventory = Node & {
  __typename?: 'ProductInventory';
  count: Scalars['BigInt']['output'];
  createdAt: Scalars['Datetime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['UUID']['output'];
  isAlwaysAvailable: Scalars['Boolean']['output'];
  nodeId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  products: Products;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};

export type ProductInventoryConnection = {
  __typename?: 'ProductInventoryConnection';
  edges: Array<ProductInventoryEdge>;
  pageInfo: PageInfo;
};

export type ProductInventoryDeleteResponse = {
  __typename?: 'ProductInventoryDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<ProductInventory>;
};

export type ProductInventoryEdge = {
  __typename?: 'ProductInventoryEdge';
  cursor: Scalars['String']['output'];
  node: ProductInventory;
};

export type ProductInventoryFilter = {
  and?: InputMaybe<Array<ProductInventoryFilter>>;
  count?: InputMaybe<BigIntFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  isAlwaysAvailable?: InputMaybe<BooleanFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<ProductInventoryFilter>;
  notes?: InputMaybe<StringFilter>;
  or?: InputMaybe<Array<ProductInventoryFilter>>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type ProductInventoryInsertInput = {
  count?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isAlwaysAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ProductInventoryInsertResponse = {
  __typename?: 'ProductInventoryInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<ProductInventory>;
};

export type ProductInventoryOrderBy = {
  count?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  isAlwaysAvailable?: InputMaybe<OrderByDirection>;
  notes?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type ProductInventoryUpdateInput = {
  count?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  isAlwaysAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ProductInventoryUpdateResponse = {
  __typename?: 'ProductInventoryUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<ProductInventory>;
};

export type ProductTypes = Node & {
  __typename?: 'ProductTypes';
  coverUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Datetime']['output'];
  iconUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nodeId: Scalars['ID']['output'];
  productsCollection?: Maybe<ProductsConnection>;
  schema?: Maybe<Scalars['JSON']['output']>;
};


export type ProductTypesProductsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ProductsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProductsOrderBy>>;
};

export type ProductTypesConnection = {
  __typename?: 'ProductTypesConnection';
  edges: Array<ProductTypesEdge>;
  pageInfo: PageInfo;
};

export type ProductTypesDeleteResponse = {
  __typename?: 'ProductTypesDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<ProductTypes>;
};

export type ProductTypesEdge = {
  __typename?: 'ProductTypesEdge';
  cursor: Scalars['String']['output'];
  node: ProductTypes;
};

export type ProductTypesFilter = {
  and?: InputMaybe<Array<ProductTypesFilter>>;
  coverUrl?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  iconUrl?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  key?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<ProductTypesFilter>;
  or?: InputMaybe<Array<ProductTypesFilter>>;
};

export type ProductTypesInsertInput = {
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  schema?: InputMaybe<Scalars['JSON']['input']>;
};

export type ProductTypesInsertResponse = {
  __typename?: 'ProductTypesInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<ProductTypes>;
};

export type ProductTypesOrderBy = {
  coverUrl?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  iconUrl?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  key?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type ProductTypesUpdateInput = {
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  iconUrl?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  schema?: InputMaybe<Scalars['JSON']['input']>;
};

export type ProductTypesUpdateResponse = {
  __typename?: 'ProductTypesUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<ProductTypes>;
};

export type Products = Node & {
  __typename?: 'Products';
  createdAt: Scalars['Datetime']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['UUID']['output'];
  instructions?: Maybe<Scalars['String']['output']>;
  longDescription?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nodeId: Scalars['ID']['output'];
  orderItemsCollection?: Maybe<OrderItemsConnection>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  productInventory?: Maybe<ProductInventory>;
  productType?: Maybe<ProductTypes>;
  productTypeId?: Maybe<Scalars['UUID']['output']>;
  shoppingCartItemsCollection?: Maybe<ShoppingCartItemsConnection>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  unitPrice: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
};


export type ProductsOrderItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<OrderItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrderItemsOrderBy>>;
};


export type ProductsShoppingCartItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ShoppingCartItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShoppingCartItemsOrderBy>>;
};

export type ProductsConnection = {
  __typename?: 'ProductsConnection';
  edges: Array<ProductsEdge>;
  pageInfo: PageInfo;
};

export type ProductsDeleteResponse = {
  __typename?: 'ProductsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Products>;
};

export type ProductsEdge = {
  __typename?: 'ProductsEdge';
  cursor: Scalars['String']['output'];
  node: Products;
};

export type ProductsFilter = {
  and?: InputMaybe<Array<ProductsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  instructions?: InputMaybe<StringFilter>;
  longDescription?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<ProductsFilter>;
  or?: InputMaybe<Array<ProductsFilter>>;
  photoUrl?: InputMaybe<StringFilter>;
  productTypeId?: InputMaybe<UuidFilter>;
  shortDescription?: InputMaybe<StringFilter>;
  unit?: InputMaybe<StringFilter>;
  unitPrice?: InputMaybe<FloatFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type ProductsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  productTypeId?: InputMaybe<Scalars['UUID']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ProductsInsertResponse = {
  __typename?: 'ProductsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Products>;
};

export type ProductsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  instructions?: InputMaybe<OrderByDirection>;
  longDescription?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  photoUrl?: InputMaybe<OrderByDirection>;
  productTypeId?: InputMaybe<OrderByDirection>;
  shortDescription?: InputMaybe<OrderByDirection>;
  unit?: InputMaybe<OrderByDirection>;
  unitPrice?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type ProductsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  data?: InputMaybe<Scalars['JSON']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  instructions?: InputMaybe<Scalars['String']['input']>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  productTypeId?: InputMaybe<Scalars['UUID']['input']>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type ProductsUpdateResponse = {
  __typename?: 'ProductsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Products>;
};

export type Query = {
  __typename?: 'Query';
  deliveryLocationCollection?: Maybe<DeliveryLocationConnection>;
  navigationCollection?: Maybe<NavigationConnection>;
  navigationItemsCollection?: Maybe<NavigationItemsConnection>;
  node?: Maybe<Node>;
  notificationTypesCollection?: Maybe<NotificationTypesConnection>;
  notificationsCollection?: Maybe<NotificationsConnection>;
  orderItemsCollection?: Maybe<OrderItemsConnection>;
  orderTransactionsCollection?: Maybe<OrderTransactionsConnection>;
  ordersCollection?: Maybe<OrdersConnection>;
  permissionsCollection?: Maybe<PermissionsConnection>;
  productInventoryCollection?: Maybe<ProductInventoryConnection>;
  productTypesCollection?: Maybe<ProductTypesConnection>;
  productsCollection?: Maybe<ProductsConnection>;
  rolePermissionsCollection?: Maybe<RolePermissionsConnection>;
  rolesCollection?: Maybe<RolesConnection>;
  sessionsCollection?: Maybe<SessionsConnection>;
  shoppingCartItemsCollection?: Maybe<ShoppingCartItemsConnection>;
  shoppingCartsCollection?: Maybe<ShoppingCartsConnection>;
  stationDeliveryLocationTimeslotsCollection?: Maybe<StationDeliveryLocationTimeslotsConnection>;
  stationDeliveryLocationsCollection?: Maybe<StationDeliveryLocationsConnection>;
  stationsCollection?: Maybe<StationsConnection>;
  userPermissionsCollection?: Maybe<UserPermissionsConnection>;
  userRolesCollection?: Maybe<UserRolesConnection>;
  userStationsCollection?: Maybe<UserStationsConnection>;
  usersCollection?: Maybe<UsersConnection>;
};


export type QueryDeliveryLocationCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<DeliveryLocationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<DeliveryLocationOrderBy>>;
};


export type QueryNavigationCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NavigationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NavigationOrderBy>>;
};


export type QueryNavigationItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NavigationItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NavigationItemsOrderBy>>;
};


export type QueryNodeArgs = {
  nodeId: Scalars['ID']['input'];
};


export type QueryNotificationTypesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NotificationTypesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NotificationTypesOrderBy>>;
};


export type QueryNotificationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NotificationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NotificationsOrderBy>>;
};


export type QueryOrderItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<OrderItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrderItemsOrderBy>>;
};


export type QueryOrderTransactionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<OrderTransactionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrderTransactionsOrderBy>>;
};


export type QueryOrdersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<OrdersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrdersOrderBy>>;
};


export type QueryPermissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<PermissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PermissionsOrderBy>>;
};


export type QueryProductInventoryCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ProductInventoryFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProductInventoryOrderBy>>;
};


export type QueryProductTypesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ProductTypesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProductTypesOrderBy>>;
};


export type QueryProductsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ProductsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProductsOrderBy>>;
};


export type QueryRolePermissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RolePermissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RolePermissionsOrderBy>>;
};


export type QueryRolesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RolesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RolesOrderBy>>;
};


export type QuerySessionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<SessionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionsOrderBy>>;
};


export type QueryShoppingCartItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ShoppingCartItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShoppingCartItemsOrderBy>>;
};


export type QueryShoppingCartsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ShoppingCartsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShoppingCartsOrderBy>>;
};


export type QueryStationDeliveryLocationTimeslotsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<StationDeliveryLocationTimeslotsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StationDeliveryLocationTimeslotsOrderBy>>;
};


export type QueryStationDeliveryLocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<StationDeliveryLocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StationDeliveryLocationsOrderBy>>;
};


export type QueryStationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<StationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StationsOrderBy>>;
};


export type QueryUserPermissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UserPermissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserPermissionsOrderBy>>;
};


export type QueryUserRolesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UserRolesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserRolesOrderBy>>;
};


export type QueryUserStationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UserStationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserStationsOrderBy>>;
};


export type QueryUsersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UsersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

export type RolePermissions = Node & {
  __typename?: 'RolePermissions';
  createdAt: Scalars['Datetime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['UUID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  nodeId: Scalars['ID']['output'];
  permission: Permissions;
  permissionId: Scalars['UUID']['output'];
  role: Roles;
  roleId: Scalars['UUID']['output'];
};

export type RolePermissionsConnection = {
  __typename?: 'RolePermissionsConnection';
  edges: Array<RolePermissionsEdge>;
  pageInfo: PageInfo;
};

export type RolePermissionsDeleteResponse = {
  __typename?: 'RolePermissionsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<RolePermissions>;
};

export type RolePermissionsEdge = {
  __typename?: 'RolePermissionsEdge';
  cursor: Scalars['String']['output'];
  node: RolePermissions;
};

export type RolePermissionsFilter = {
  and?: InputMaybe<Array<RolePermissionsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  enabled?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<RolePermissionsFilter>;
  or?: InputMaybe<Array<RolePermissionsFilter>>;
  permissionId?: InputMaybe<UuidFilter>;
  roleId?: InputMaybe<UuidFilter>;
};

export type RolePermissionsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  permissionId?: InputMaybe<Scalars['UUID']['input']>;
  roleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type RolePermissionsInsertResponse = {
  __typename?: 'RolePermissionsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<RolePermissions>;
};

export type RolePermissionsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  enabled?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  permissionId?: InputMaybe<OrderByDirection>;
  roleId?: InputMaybe<OrderByDirection>;
};

export type RolePermissionsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  permissionId?: InputMaybe<Scalars['UUID']['input']>;
  roleId?: InputMaybe<Scalars['UUID']['input']>;
};

export type RolePermissionsUpdateResponse = {
  __typename?: 'RolePermissionsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<RolePermissions>;
};

export type Roles = Node & {
  __typename?: 'Roles';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nodeId: Scalars['ID']['output'];
  rolePermissionsCollection?: Maybe<RolePermissionsConnection>;
  userRolesCollection?: Maybe<UserRolesConnection>;
};


export type RolesRolePermissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<RolePermissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RolePermissionsOrderBy>>;
};


export type RolesUserRolesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UserRolesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserRolesOrderBy>>;
};

export type RolesConnection = {
  __typename?: 'RolesConnection';
  edges: Array<RolesEdge>;
  pageInfo: PageInfo;
};

export type RolesDeleteResponse = {
  __typename?: 'RolesDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Roles>;
};

export type RolesEdge = {
  __typename?: 'RolesEdge';
  cursor: Scalars['String']['output'];
  node: Roles;
};

export type RolesFilter = {
  and?: InputMaybe<Array<RolesFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  key?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<RolesFilter>;
  or?: InputMaybe<Array<RolesFilter>>;
};

export type RolesInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type RolesInsertResponse = {
  __typename?: 'RolesInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Roles>;
};

export type RolesOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  key?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
};

export type RolesUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type RolesUpdateResponse = {
  __typename?: 'RolesUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Roles>;
};

export type Sessions = Node & {
  __typename?: 'Sessions';
  did: Scalars['String']['output'];
  nodeId: Scalars['ID']['output'];
  sessionData: Scalars['JSON']['output'];
  updatedAt: Scalars['Datetime']['output'];
};

export type SessionsConnection = {
  __typename?: 'SessionsConnection';
  edges: Array<SessionsEdge>;
  pageInfo: PageInfo;
};

export type SessionsDeleteResponse = {
  __typename?: 'SessionsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Sessions>;
};

export type SessionsEdge = {
  __typename?: 'SessionsEdge';
  cursor: Scalars['String']['output'];
  node: Sessions;
};

export type SessionsFilter = {
  and?: InputMaybe<Array<SessionsFilter>>;
  did?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<SessionsFilter>;
  or?: InputMaybe<Array<SessionsFilter>>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type SessionsInsertInput = {
  did?: InputMaybe<Scalars['String']['input']>;
  sessionData?: InputMaybe<Scalars['JSON']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type SessionsInsertResponse = {
  __typename?: 'SessionsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Sessions>;
};

export type SessionsOrderBy = {
  did?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type SessionsUpdateInput = {
  did?: InputMaybe<Scalars['String']['input']>;
  sessionData?: InputMaybe<Scalars['JSON']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type SessionsUpdateResponse = {
  __typename?: 'SessionsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Sessions>;
};

export type ShoppingCartItems = Node & {
  __typename?: 'ShoppingCartItems';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  nodeId: Scalars['ID']['output'];
  product: Products;
  productId: Scalars['UUID']['output'];
  quantity: Scalars['BigInt']['output'];
  shoppingCart: ShoppingCarts;
  shoppingCartId: Scalars['UUID']['output'];
  unitPrice: Scalars['Float']['output'];
  user: Users;
  userId: Scalars['UUID']['output'];
};

export type ShoppingCartItemsConnection = {
  __typename?: 'ShoppingCartItemsConnection';
  edges: Array<ShoppingCartItemsEdge>;
  pageInfo: PageInfo;
};

export type ShoppingCartItemsDeleteResponse = {
  __typename?: 'ShoppingCartItemsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<ShoppingCartItems>;
};

export type ShoppingCartItemsEdge = {
  __typename?: 'ShoppingCartItemsEdge';
  cursor: Scalars['String']['output'];
  node: ShoppingCartItems;
};

export type ShoppingCartItemsFilter = {
  and?: InputMaybe<Array<ShoppingCartItemsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<ShoppingCartItemsFilter>;
  or?: InputMaybe<Array<ShoppingCartItemsFilter>>;
  productId?: InputMaybe<UuidFilter>;
  quantity?: InputMaybe<BigIntFilter>;
  shoppingCartId?: InputMaybe<UuidFilter>;
  unitPrice?: InputMaybe<FloatFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type ShoppingCartItemsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['BigInt']['input']>;
  shoppingCartId?: InputMaybe<Scalars['UUID']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type ShoppingCartItemsInsertResponse = {
  __typename?: 'ShoppingCartItemsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<ShoppingCartItems>;
};

export type ShoppingCartItemsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  productId?: InputMaybe<OrderByDirection>;
  quantity?: InputMaybe<OrderByDirection>;
  shoppingCartId?: InputMaybe<OrderByDirection>;
  unitPrice?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type ShoppingCartItemsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  productId?: InputMaybe<Scalars['UUID']['input']>;
  quantity?: InputMaybe<Scalars['BigInt']['input']>;
  shoppingCartId?: InputMaybe<Scalars['UUID']['input']>;
  unitPrice?: InputMaybe<Scalars['Float']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type ShoppingCartItemsUpdateResponse = {
  __typename?: 'ShoppingCartItemsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<ShoppingCartItems>;
};

export type ShoppingCarts = Node & {
  __typename?: 'ShoppingCarts';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  nodeId: Scalars['ID']['output'];
  order?: Maybe<Orders>;
  orderId?: Maybe<Scalars['UUID']['output']>;
  shoppingCartItemsCollection?: Maybe<ShoppingCartItemsConnection>;
  user: Users;
  userId: Scalars['UUID']['output'];
};


export type ShoppingCartsShoppingCartItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ShoppingCartItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShoppingCartItemsOrderBy>>;
};

export type ShoppingCartsConnection = {
  __typename?: 'ShoppingCartsConnection';
  edges: Array<ShoppingCartsEdge>;
  pageInfo: PageInfo;
};

export type ShoppingCartsDeleteResponse = {
  __typename?: 'ShoppingCartsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<ShoppingCarts>;
};

export type ShoppingCartsEdge = {
  __typename?: 'ShoppingCartsEdge';
  cursor: Scalars['String']['output'];
  node: ShoppingCarts;
};

export type ShoppingCartsFilter = {
  and?: InputMaybe<Array<ShoppingCartsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<ShoppingCartsFilter>;
  or?: InputMaybe<Array<ShoppingCartsFilter>>;
  orderId?: InputMaybe<UuidFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type ShoppingCartsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  orderId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type ShoppingCartsInsertResponse = {
  __typename?: 'ShoppingCartsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<ShoppingCarts>;
};

export type ShoppingCartsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  orderId?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type ShoppingCartsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  orderId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type ShoppingCartsUpdateResponse = {
  __typename?: 'ShoppingCartsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<ShoppingCarts>;
};

export type StationDeliveryLocationTimeslots = Node & {
  __typename?: 'StationDeliveryLocationTimeslots';
  beginAt: Scalars['Datetime']['output'];
  createdAt: Scalars['Datetime']['output'];
  endAt?: Maybe<Scalars['Datetime']['output']>;
  id: Scalars['UUID']['output'];
  nodeId: Scalars['ID']['output'];
  stationDeliveryLocation: StationDeliveryLocations;
  stationDeliveryLocationId: Scalars['UUID']['output'];
};

export type StationDeliveryLocationTimeslotsConnection = {
  __typename?: 'StationDeliveryLocationTimeslotsConnection';
  edges: Array<StationDeliveryLocationTimeslotsEdge>;
  pageInfo: PageInfo;
};

export type StationDeliveryLocationTimeslotsDeleteResponse = {
  __typename?: 'StationDeliveryLocationTimeslotsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<StationDeliveryLocationTimeslots>;
};

export type StationDeliveryLocationTimeslotsEdge = {
  __typename?: 'StationDeliveryLocationTimeslotsEdge';
  cursor: Scalars['String']['output'];
  node: StationDeliveryLocationTimeslots;
};

export type StationDeliveryLocationTimeslotsFilter = {
  and?: InputMaybe<Array<StationDeliveryLocationTimeslotsFilter>>;
  beginAt?: InputMaybe<DatetimeFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  endAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<StationDeliveryLocationTimeslotsFilter>;
  or?: InputMaybe<Array<StationDeliveryLocationTimeslotsFilter>>;
  stationDeliveryLocationId?: InputMaybe<UuidFilter>;
};

export type StationDeliveryLocationTimeslotsInsertInput = {
  beginAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  endAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  stationDeliveryLocationId?: InputMaybe<Scalars['UUID']['input']>;
};

export type StationDeliveryLocationTimeslotsInsertResponse = {
  __typename?: 'StationDeliveryLocationTimeslotsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<StationDeliveryLocationTimeslots>;
};

export type StationDeliveryLocationTimeslotsOrderBy = {
  beginAt?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  endAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  stationDeliveryLocationId?: InputMaybe<OrderByDirection>;
};

export type StationDeliveryLocationTimeslotsUpdateInput = {
  beginAt?: InputMaybe<Scalars['Datetime']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  endAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  stationDeliveryLocationId?: InputMaybe<Scalars['UUID']['input']>;
};

export type StationDeliveryLocationTimeslotsUpdateResponse = {
  __typename?: 'StationDeliveryLocationTimeslotsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<StationDeliveryLocationTimeslots>;
};

export type StationDeliveryLocations = Node & {
  __typename?: 'StationDeliveryLocations';
  createdAt: Scalars['Datetime']['output'];
  deliveryLocation?: Maybe<DeliveryLocation>;
  deliveryLocationId: Scalars['UUID']['output'];
  id: Scalars['UUID']['output'];
  nodeId: Scalars['ID']['output'];
  station: Stations;
  stationDeliveryLocationTimeslotsCollection?: Maybe<StationDeliveryLocationTimeslotsConnection>;
  stationId: Scalars['UUID']['output'];
};


export type StationDeliveryLocationsStationDeliveryLocationTimeslotsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<StationDeliveryLocationTimeslotsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StationDeliveryLocationTimeslotsOrderBy>>;
};

export type StationDeliveryLocationsConnection = {
  __typename?: 'StationDeliveryLocationsConnection';
  edges: Array<StationDeliveryLocationsEdge>;
  pageInfo: PageInfo;
};

export type StationDeliveryLocationsDeleteResponse = {
  __typename?: 'StationDeliveryLocationsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<StationDeliveryLocations>;
};

export type StationDeliveryLocationsEdge = {
  __typename?: 'StationDeliveryLocationsEdge';
  cursor: Scalars['String']['output'];
  node: StationDeliveryLocations;
};

export type StationDeliveryLocationsFilter = {
  and?: InputMaybe<Array<StationDeliveryLocationsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  deliveryLocationId?: InputMaybe<UuidFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<StationDeliveryLocationsFilter>;
  or?: InputMaybe<Array<StationDeliveryLocationsFilter>>;
  stationId?: InputMaybe<UuidFilter>;
};

export type StationDeliveryLocationsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  deliveryLocationId?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  stationId?: InputMaybe<Scalars['UUID']['input']>;
};

export type StationDeliveryLocationsInsertResponse = {
  __typename?: 'StationDeliveryLocationsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<StationDeliveryLocations>;
};

export type StationDeliveryLocationsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  deliveryLocationId?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  stationId?: InputMaybe<OrderByDirection>;
};

export type StationDeliveryLocationsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  deliveryLocationId?: InputMaybe<Scalars['UUID']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  stationId?: InputMaybe<Scalars['UUID']['input']>;
};

export type StationDeliveryLocationsUpdateResponse = {
  __typename?: 'StationDeliveryLocationsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<StationDeliveryLocations>;
};

export type Stations = Node & {
  __typename?: 'Stations';
  address: Scalars['String']['output'];
  address1?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  coverUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['Datetime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longDescription?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  nodeId: Scalars['ID']['output'];
  number?: Maybe<Scalars['Int']['output']>;
  registrationCode: Scalars['String']['output'];
  state: Scalars['String']['output'];
  stationDeliveryLocationsCollection?: Maybe<StationDeliveryLocationsConnection>;
  userStationsCollection?: Maybe<UserStationsConnection>;
  usersCollection?: Maybe<UsersConnection>;
  zip: Scalars['String']['output'];
};


export type StationsStationDeliveryLocationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<StationDeliveryLocationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StationDeliveryLocationsOrderBy>>;
};


export type StationsUserStationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UserStationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserStationsOrderBy>>;
};


export type StationsUsersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UsersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
};

export type StationsConnection = {
  __typename?: 'StationsConnection';
  edges: Array<StationsEdge>;
  pageInfo: PageInfo;
};

export type StationsDeleteResponse = {
  __typename?: 'StationsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Stations>;
};

export type StationsEdge = {
  __typename?: 'StationsEdge';
  cursor: Scalars['String']['output'];
  node: Stations;
};

export type StationsFilter = {
  address?: InputMaybe<StringFilter>;
  address1?: InputMaybe<StringFilter>;
  and?: InputMaybe<Array<StationsFilter>>;
  city?: InputMaybe<StringFilter>;
  coverUrl?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DatetimeFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  imageUrl?: InputMaybe<StringFilter>;
  latitude?: InputMaybe<FloatFilter>;
  longDescription?: InputMaybe<StringFilter>;
  longitude?: InputMaybe<FloatFilter>;
  name?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<StationsFilter>;
  number?: InputMaybe<IntFilter>;
  or?: InputMaybe<Array<StationsFilter>>;
  registrationCode?: InputMaybe<StringFilter>;
  state?: InputMaybe<StringFilter>;
  zip?: InputMaybe<StringFilter>;
};

export type StationsInsertInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  address1?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  registrationCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type StationsInsertResponse = {
  __typename?: 'StationsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Stations>;
};

export type StationsOrderBy = {
  address?: InputMaybe<OrderByDirection>;
  address1?: InputMaybe<OrderByDirection>;
  city?: InputMaybe<OrderByDirection>;
  coverUrl?: InputMaybe<OrderByDirection>;
  createdAt?: InputMaybe<OrderByDirection>;
  description?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  imageUrl?: InputMaybe<OrderByDirection>;
  latitude?: InputMaybe<OrderByDirection>;
  longDescription?: InputMaybe<OrderByDirection>;
  longitude?: InputMaybe<OrderByDirection>;
  name?: InputMaybe<OrderByDirection>;
  number?: InputMaybe<OrderByDirection>;
  registrationCode?: InputMaybe<OrderByDirection>;
  state?: InputMaybe<OrderByDirection>;
  zip?: InputMaybe<OrderByDirection>;
};

export type StationsUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  address1?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  coverUrl?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longDescription?: InputMaybe<Scalars['String']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  registrationCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type StationsUpdateResponse = {
  __typename?: 'StationsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Stations>;
};

export type StringFilter = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  ilike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  iregex?: InputMaybe<Scalars['String']['input']>;
  is?: InputMaybe<FilterIs>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  regex?: InputMaybe<Scalars['String']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type StringListFilter = {
  containedBy?: InputMaybe<Array<Scalars['String']['input']>>;
  contains?: InputMaybe<Array<Scalars['String']['input']>>;
  eq?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']['input']>;
  gt?: InputMaybe<Scalars['Time']['input']>;
  gte?: InputMaybe<Scalars['Time']['input']>;
  in?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']['input']>;
  lte?: InputMaybe<Scalars['Time']['input']>;
  neq?: InputMaybe<Scalars['Time']['input']>;
};

export type TimeListFilter = {
  containedBy?: InputMaybe<Array<Scalars['Time']['input']>>;
  contains?: InputMaybe<Array<Scalars['Time']['input']>>;
  eq?: InputMaybe<Array<Scalars['Time']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['Time']['input']>>;
};

export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']['input']>;
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']['input']>;
};

export type UuidListFilter = {
  containedBy?: InputMaybe<Array<Scalars['UUID']['input']>>;
  contains?: InputMaybe<Array<Scalars['UUID']['input']>>;
  eq?: InputMaybe<Array<Scalars['UUID']['input']>>;
  is?: InputMaybe<FilterIs>;
  overlaps?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

export type UserPermissions = Node & {
  __typename?: 'UserPermissions';
  createdAt: Scalars['Datetime']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['UUID']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  nodeId: Scalars['ID']['output'];
  permission: Permissions;
  permissionId: Scalars['UUID']['output'];
  user: Users;
  userId: Scalars['UUID']['output'];
};

export type UserPermissionsConnection = {
  __typename?: 'UserPermissionsConnection';
  edges: Array<UserPermissionsEdge>;
  pageInfo: PageInfo;
};

export type UserPermissionsDeleteResponse = {
  __typename?: 'UserPermissionsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<UserPermissions>;
};

export type UserPermissionsEdge = {
  __typename?: 'UserPermissionsEdge';
  cursor: Scalars['String']['output'];
  node: UserPermissions;
};

export type UserPermissionsFilter = {
  and?: InputMaybe<Array<UserPermissionsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  enabled?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<UserPermissionsFilter>;
  or?: InputMaybe<Array<UserPermissionsFilter>>;
  permissionId?: InputMaybe<UuidFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type UserPermissionsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  permissionId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UserPermissionsInsertResponse = {
  __typename?: 'UserPermissionsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<UserPermissions>;
};

export type UserPermissionsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  enabled?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  permissionId?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type UserPermissionsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  permissionId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UserPermissionsUpdateResponse = {
  __typename?: 'UserPermissionsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<UserPermissions>;
};

export type UserRoles = Node & {
  __typename?: 'UserRoles';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  nodeId: Scalars['ID']['output'];
  role: Roles;
  roleId: Scalars['UUID']['output'];
  user: Users;
  userId: Scalars['UUID']['output'];
};

export type UserRolesConnection = {
  __typename?: 'UserRolesConnection';
  edges: Array<UserRolesEdge>;
  pageInfo: PageInfo;
};

export type UserRolesDeleteResponse = {
  __typename?: 'UserRolesDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<UserRoles>;
};

export type UserRolesEdge = {
  __typename?: 'UserRolesEdge';
  cursor: Scalars['String']['output'];
  node: UserRoles;
};

export type UserRolesFilter = {
  and?: InputMaybe<Array<UserRolesFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<UserRolesFilter>;
  or?: InputMaybe<Array<UserRolesFilter>>;
  roleId?: InputMaybe<UuidFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type UserRolesInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  roleId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UserRolesInsertResponse = {
  __typename?: 'UserRolesInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<UserRoles>;
};

export type UserRolesOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  roleId?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type UserRolesUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  roleId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UserRolesUpdateResponse = {
  __typename?: 'UserRolesUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<UserRoles>;
};

export type UserStations = Node & {
  __typename?: 'UserStations';
  createdAt: Scalars['Datetime']['output'];
  id: Scalars['UUID']['output'];
  nodeId: Scalars['ID']['output'];
  station: Stations;
  stationId: Scalars['UUID']['output'];
  user: Users;
  userId: Scalars['UUID']['output'];
};

export type UserStationsConnection = {
  __typename?: 'UserStationsConnection';
  edges: Array<UserStationsEdge>;
  pageInfo: PageInfo;
};

export type UserStationsDeleteResponse = {
  __typename?: 'UserStationsDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<UserStations>;
};

export type UserStationsEdge = {
  __typename?: 'UserStationsEdge';
  cursor: Scalars['String']['output'];
  node: UserStations;
};

export type UserStationsFilter = {
  and?: InputMaybe<Array<UserStationsFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  id?: InputMaybe<UuidFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<UserStationsFilter>;
  or?: InputMaybe<Array<UserStationsFilter>>;
  stationId?: InputMaybe<UuidFilter>;
  userId?: InputMaybe<UuidFilter>;
};

export type UserStationsInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  stationId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UserStationsInsertResponse = {
  __typename?: 'UserStationsInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<UserStations>;
};

export type UserStationsOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  stationId?: InputMaybe<OrderByDirection>;
  userId?: InputMaybe<OrderByDirection>;
};

export type UserStationsUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  stationId?: InputMaybe<Scalars['UUID']['input']>;
  userId?: InputMaybe<Scalars['UUID']['input']>;
};

export type UserStationsUpdateResponse = {
  __typename?: 'UserStationsUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<UserStations>;
};

export type Users = Node & {
  __typename?: 'Users';
  createdAt: Scalars['Datetime']['output'];
  did: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  handle: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  lastName: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  nodeId: Scalars['ID']['output'];
  notificationsCollection?: Maybe<NotificationsConnection>;
  ordersCollection?: Maybe<OrdersConnection>;
  pdsUrl: Scalars['String']['output'];
  primaryStation?: Maybe<Stations>;
  primaryStationId?: Maybe<Scalars['UUID']['output']>;
  shoppingCartItemsCollection?: Maybe<ShoppingCartItemsConnection>;
  shoppingCartsCollection?: Maybe<ShoppingCartsConnection>;
  updatedAt?: Maybe<Scalars['Datetime']['output']>;
  userPermissionsCollection?: Maybe<UserPermissionsConnection>;
  userRolesCollection?: Maybe<UserRolesConnection>;
  userStationsCollection?: Maybe<UserStationsConnection>;
};


export type UsersNotificationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<NotificationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<NotificationsOrderBy>>;
};


export type UsersOrdersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<OrdersFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrdersOrderBy>>;
};


export type UsersShoppingCartItemsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ShoppingCartItemsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShoppingCartItemsOrderBy>>;
};


export type UsersShoppingCartsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<ShoppingCartsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ShoppingCartsOrderBy>>;
};


export type UsersUserPermissionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UserPermissionsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserPermissionsOrderBy>>;
};


export type UsersUserRolesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UserRolesFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserRolesOrderBy>>;
};


export type UsersUserStationsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  filter?: InputMaybe<UserStationsFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserStationsOrderBy>>;
};

export type UsersConnection = {
  __typename?: 'UsersConnection';
  edges: Array<UsersEdge>;
  pageInfo: PageInfo;
};

export type UsersDeleteResponse = {
  __typename?: 'UsersDeleteResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Users>;
};

export type UsersEdge = {
  __typename?: 'UsersEdge';
  cursor: Scalars['String']['output'];
  node: Users;
};

export type UsersFilter = {
  and?: InputMaybe<Array<UsersFilter>>;
  createdAt?: InputMaybe<DatetimeFilter>;
  did?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  handle?: InputMaybe<StringFilter>;
  id?: InputMaybe<UuidFilter>;
  lastName?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  not?: InputMaybe<UsersFilter>;
  or?: InputMaybe<Array<UsersFilter>>;
  pdsUrl?: InputMaybe<StringFilter>;
  primaryStationId?: InputMaybe<UuidFilter>;
  updatedAt?: InputMaybe<DatetimeFilter>;
};

export type UsersInsertInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  did?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  pdsUrl?: InputMaybe<Scalars['String']['input']>;
  primaryStationId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type UsersInsertResponse = {
  __typename?: 'UsersInsertResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Users>;
};

export type UsersOrderBy = {
  createdAt?: InputMaybe<OrderByDirection>;
  did?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  firstName?: InputMaybe<OrderByDirection>;
  handle?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  lastName?: InputMaybe<OrderByDirection>;
  pdsUrl?: InputMaybe<OrderByDirection>;
  primaryStationId?: InputMaybe<OrderByDirection>;
  updatedAt?: InputMaybe<OrderByDirection>;
};

export type UsersUpdateInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  did?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['UUID']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  pdsUrl?: InputMaybe<Scalars['String']['input']>;
  primaryStationId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
};

export type UsersUpdateResponse = {
  __typename?: 'UsersUpdateResponse';
  affectedCount: Scalars['Int']['output'];
  records: Array<Users>;
};

export type NavigationFragment = { __typename?: 'Navigation', id: any, name: string, key: string, data?: any | null, createdAt: any, navigationItemsCollection?: { __typename?: 'NavigationItemsConnection', edges: Array<{ __typename?: 'NavigationItemsEdge', node: { __typename?: 'NavigationItems', id: any, navigationId: any, parentId?: any | null, name: string, path: string, iconName?: string | null, tag: string, data?: any | null, roles?: Array<string | null> | null, createdAt: any, index: number } }> } | null };

export type NavigationItemFragment = { __typename?: 'NavigationItems', id: any, navigationId: any, parentId?: any | null, name: string, path: string, iconName?: string | null, tag: string, data?: any | null, roles?: Array<string | null> | null, createdAt: any, index: number };

export type NavigationQueryVariables = Exact<{ [key: string]: never; }>;


export type NavigationQuery = { __typename?: 'Query', navigationCollection?: { __typename?: 'NavigationConnection', edges: Array<{ __typename?: 'NavigationEdge', node: { __typename?: 'Navigation', id: any, name: string, key: string, data?: any | null, createdAt: any, navigationItemsCollection?: { __typename?: 'NavigationItemsConnection', edges: Array<{ __typename?: 'NavigationItemsEdge', node: { __typename?: 'NavigationItems', id: any, navigationId: any, parentId?: any | null, name: string, path: string, iconName?: string | null, tag: string, data?: any | null, roles?: Array<string | null> | null, createdAt: any, index: number } }> } | null } }> } | null };

export type AdminNavigationQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminNavigationQuery = { __typename?: 'Query', navigationCollection?: { __typename?: 'NavigationConnection', edges: Array<{ __typename?: 'NavigationEdge', node: { __typename?: 'Navigation', id: any, name: string, key: string, data?: any | null, createdAt: any, navigationItemsCollection?: { __typename?: 'NavigationItemsConnection', edges: Array<{ __typename?: 'NavigationItemsEdge', node: { __typename?: 'NavigationItems', id: any, navigationId: any, parentId?: any | null, name: string, path: string, iconName?: string | null, tag: string, data?: any | null, roles?: Array<string | null> | null, createdAt: any, index: number } }> } | null } }> } | null };

export type TopNavigationQueryVariables = Exact<{ [key: string]: never; }>;


export type TopNavigationQuery = { __typename?: 'Query', navigationCollection?: { __typename?: 'NavigationConnection', edges: Array<{ __typename?: 'NavigationEdge', node: { __typename?: 'Navigation', id: any, name: string, key: string, data?: any | null, createdAt: any, navigationItemsCollection?: { __typename?: 'NavigationItemsConnection', edges: Array<{ __typename?: 'NavigationItemsEdge', node: { __typename?: 'NavigationItems', id: any, navigationId: any, parentId?: any | null, name: string, path: string, iconName?: string | null, tag: string, data?: any | null, roles?: Array<string | null> | null, createdAt: any, index: number } }> } | null } }> } | null };

export type CreateNavigationMutationVariables = Exact<{
  input: NavigationInsertInput;
}>;


export type CreateNavigationMutation = { __typename?: 'Mutation', insertIntoNavigationCollection?: { __typename?: 'NavigationInsertResponse', records: Array<{ __typename?: 'Navigation', id: any, name: string, key: string, data?: any | null, createdAt: any, navigationItemsCollection?: { __typename?: 'NavigationItemsConnection', edges: Array<{ __typename?: 'NavigationItemsEdge', node: { __typename?: 'NavigationItems', id: any, navigationId: any, parentId?: any | null, name: string, path: string, iconName?: string | null, tag: string, data?: any | null, roles?: Array<string | null> | null, createdAt: any, index: number } }> } | null }> } | null };

export type UpdateNavigationMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: NavigationUpdateInput;
}>;


export type UpdateNavigationMutation = { __typename?: 'Mutation', updateNavigationCollection: { __typename?: 'NavigationUpdateResponse', records: Array<{ __typename?: 'Navigation', id: any, name: string, key: string, data?: any | null, createdAt: any, navigationItemsCollection?: { __typename?: 'NavigationItemsConnection', edges: Array<{ __typename?: 'NavigationItemsEdge', node: { __typename?: 'NavigationItems', id: any, navigationId: any, parentId?: any | null, name: string, path: string, iconName?: string | null, tag: string, data?: any | null, roles?: Array<string | null> | null, createdAt: any, index: number } }> } | null }> } };

export type DeleteNavigationMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteNavigationMutation = { __typename?: 'Mutation', deleteFromNavigationCollection: { __typename?: 'NavigationDeleteResponse', affectedCount: number } };

export type CreateNavigationItemMutationVariables = Exact<{
  input: NavigationItemsInsertInput;
}>;


export type CreateNavigationItemMutation = { __typename?: 'Mutation', insertIntoNavigationItemsCollection?: { __typename?: 'NavigationItemsInsertResponse', records: Array<{ __typename?: 'NavigationItems', id: any, navigationId: any, parentId?: any | null, name: string, path: string, iconName?: string | null, tag: string, data?: any | null, roles?: Array<string | null> | null, createdAt: any, index: number }> } | null };

export type UpdateNavigationItemMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: NavigationItemsUpdateInput;
}>;


export type UpdateNavigationItemMutation = { __typename?: 'Mutation', updateNavigationItemsCollection: { __typename?: 'NavigationItemsUpdateResponse', records: Array<{ __typename?: 'NavigationItems', id: any, navigationId: any, parentId?: any | null, name: string, path: string, iconName?: string | null, tag: string, data?: any | null, roles?: Array<string | null> | null, createdAt: any, index: number }> } };

export type DeleteNavigationItemMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteNavigationItemMutation = { __typename?: 'Mutation', deleteFromNavigationItemsCollection: { __typename?: 'NavigationItemsDeleteResponse', affectedCount: number } };

export type NotificationFragment = { __typename?: 'Notifications', id: any, title: string, subtitle: string, createdAt: any, data?: any | null, isRead: boolean, iconUrl?: string | null, messageMarkdown?: string | null, notificationTypeId: any, notificationType: { __typename?: 'NotificationTypes', id: any, iconUrl?: string | null, name: string, schema?: any | null, createdAt: any } };

export type NotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationsQuery = { __typename?: 'Query', notificationsCollection?: { __typename?: 'NotificationsConnection', edges: Array<{ __typename?: 'NotificationsEdge', node: { __typename?: 'Notifications', id: any, title: string, subtitle: string, createdAt: any, data?: any | null, isRead: boolean, iconUrl?: string | null, messageMarkdown?: string | null, notificationTypeId: any, notificationType: { __typename?: 'NotificationTypes', id: any, iconUrl?: string | null, name: string, schema?: any | null, createdAt: any } } }> } | null };

export type NotificationQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type NotificationQuery = { __typename?: 'Query', notificationsCollection?: { __typename?: 'NotificationsConnection', edges: Array<{ __typename?: 'NotificationsEdge', node: { __typename?: 'Notifications', id: any, title: string, subtitle: string, createdAt: any, data?: any | null, isRead: boolean, iconUrl?: string | null, messageMarkdown?: string | null, notificationTypeId: any, notificationType: { __typename?: 'NotificationTypes', id: any, iconUrl?: string | null, name: string, schema?: any | null, createdAt: any } } }> } | null };

export type CreateNotificationMutationVariables = Exact<{
  input: NotificationsInsertInput;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', insertIntoNotificationsCollection?: { __typename?: 'NotificationsInsertResponse', records: Array<{ __typename?: 'Notifications', id: any, title: string, subtitle: string, createdAt: any, data?: any | null, isRead: boolean, iconUrl?: string | null, messageMarkdown?: string | null, notificationTypeId: any, notificationType: { __typename?: 'NotificationTypes', id: any, iconUrl?: string | null, name: string, schema?: any | null, createdAt: any } }> } | null };

export type UpdateNotificationMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: NotificationsUpdateInput;
}>;


export type UpdateNotificationMutation = { __typename?: 'Mutation', updateNotificationsCollection: { __typename?: 'NotificationsUpdateResponse', records: Array<{ __typename?: 'Notifications', id: any, title: string, subtitle: string, createdAt: any, data?: any | null, isRead: boolean, iconUrl?: string | null, messageMarkdown?: string | null, notificationTypeId: any, notificationType: { __typename?: 'NotificationTypes', id: any, iconUrl?: string | null, name: string, schema?: any | null, createdAt: any } }> } };

export type DeleteNotificationMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteNotificationMutation = { __typename?: 'Mutation', deleteFromNotificationsCollection: { __typename?: 'NotificationsDeleteResponse', affectedCount: number } };

export type NotificationTypeFragment = { __typename?: 'NotificationTypes', id: any, name: string, key: string, iconUrl?: string | null, createdAt: any };

export type NotificationTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type NotificationTypesQuery = { __typename?: 'Query', notificationTypesCollection?: { __typename?: 'NotificationTypesConnection', edges: Array<{ __typename?: 'NotificationTypesEdge', node: { __typename?: 'NotificationTypes', id: any, name: string, key: string, iconUrl?: string | null, createdAt: any } }> } | null };

export type NotificationTypeQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type NotificationTypeQuery = { __typename?: 'Query', notificationTypesCollection?: { __typename?: 'NotificationTypesConnection', edges: Array<{ __typename?: 'NotificationTypesEdge', node: { __typename?: 'NotificationTypes', id: any, name: string, key: string, iconUrl?: string | null, createdAt: any } }> } | null };

export type CreateNotificationTypeMutationVariables = Exact<{
  input: NotificationTypesInsertInput;
}>;


export type CreateNotificationTypeMutation = { __typename?: 'Mutation', insertIntoNotificationTypesCollection?: { __typename?: 'NotificationTypesInsertResponse', records: Array<{ __typename?: 'NotificationTypes', id: any, name: string, key: string, iconUrl?: string | null, createdAt: any }> } | null };

export type UpdateNotificationTypeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: NotificationTypesUpdateInput;
}>;


export type UpdateNotificationTypeMutation = { __typename?: 'Mutation', updateNotificationTypesCollection: { __typename?: 'NotificationTypesUpdateResponse', records: Array<{ __typename?: 'NotificationTypes', id: any, name: string, key: string, iconUrl?: string | null, createdAt: any }> } };

export type DeleteNotificationTypeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteNotificationTypeMutation = { __typename?: 'Mutation', deleteFromNotificationTypesCollection: { __typename?: 'NotificationTypesDeleteResponse', affectedCount: number } };

export type OrderFragment = { __typename?: 'Orders', id: any, userId: any, orderStatus: OrderStatus, createdAt: any, updatedAt?: any | null, scheduledDeliveryAt?: any | null, deliveryAddress?: string | null, deliveryAddress1?: string | null, deliveryCity?: string | null, deliveryZip?: string | null, deliveryState?: string | null, deliveryLat?: number | null, deliveryLong?: number | null, notes?: string | null, subtotal?: any | null, tax?: any | null, total?: any | null, orderItemsCollection?: { __typename?: 'OrderItemsConnection', edges: Array<{ __typename?: 'OrderItemsEdge', node: { __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null } }> } | null };

export type OrdersQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrdersOrderBy> | OrdersOrderBy>;
}>;


export type OrdersQuery = { __typename?: 'Query', ordersCollection?: { __typename?: 'OrdersConnection', edges: Array<{ __typename?: 'OrdersEdge', node: { __typename?: 'Orders', id: any, userId: any, orderStatus: OrderStatus, createdAt: any, updatedAt?: any | null, scheduledDeliveryAt?: any | null, deliveryAddress?: string | null, deliveryAddress1?: string | null, deliveryCity?: string | null, deliveryZip?: string | null, deliveryState?: string | null, deliveryLat?: number | null, deliveryLong?: number | null, notes?: string | null, subtotal?: any | null, tax?: any | null, total?: any | null, orderItemsCollection?: { __typename?: 'OrderItemsConnection', edges: Array<{ __typename?: 'OrderItemsEdge', node: { __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null } }> } | null } }> } | null };

export type OrderQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type OrderQuery = { __typename?: 'Query', ordersCollection?: { __typename?: 'OrdersConnection', edges: Array<{ __typename?: 'OrdersEdge', node: { __typename?: 'Orders', id: any, userId: any, orderStatus: OrderStatus, createdAt: any, updatedAt?: any | null, scheduledDeliveryAt?: any | null, deliveryAddress?: string | null, deliveryAddress1?: string | null, deliveryCity?: string | null, deliveryZip?: string | null, deliveryState?: string | null, deliveryLat?: number | null, deliveryLong?: number | null, notes?: string | null, subtotal?: any | null, tax?: any | null, total?: any | null, orderItemsCollection?: { __typename?: 'OrderItemsConnection', edges: Array<{ __typename?: 'OrderItemsEdge', node: { __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null } }> } | null } }> } | null };

export type OrdersByUserQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrdersOrderBy> | OrdersOrderBy>;
  userId: Scalars['UUID']['input'];
}>;


export type OrdersByUserQuery = { __typename?: 'Query', ordersCollection?: { __typename?: 'OrdersConnection', edges: Array<{ __typename?: 'OrdersEdge', node: { __typename?: 'Orders', id: any, userId: any, orderStatus: OrderStatus, createdAt: any, updatedAt?: any | null, scheduledDeliveryAt?: any | null, deliveryAddress?: string | null, deliveryAddress1?: string | null, deliveryCity?: string | null, deliveryZip?: string | null, deliveryState?: string | null, deliveryLat?: number | null, deliveryLong?: number | null, notes?: string | null, subtotal?: any | null, tax?: any | null, total?: any | null, orderItemsCollection?: { __typename?: 'OrderItemsConnection', edges: Array<{ __typename?: 'OrderItemsEdge', node: { __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null } }> } | null } }> } | null };

export type OrdersByStatusQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrdersOrderBy> | OrdersOrderBy>;
  status: OrderStatus;
}>;


export type OrdersByStatusQuery = { __typename?: 'Query', ordersCollection?: { __typename?: 'OrdersConnection', edges: Array<{ __typename?: 'OrdersEdge', node: { __typename?: 'Orders', id: any, userId: any, orderStatus: OrderStatus, createdAt: any, updatedAt?: any | null, scheduledDeliveryAt?: any | null, deliveryAddress?: string | null, deliveryAddress1?: string | null, deliveryCity?: string | null, deliveryZip?: string | null, deliveryState?: string | null, deliveryLat?: number | null, deliveryLong?: number | null, notes?: string | null, subtotal?: any | null, tax?: any | null, total?: any | null, orderItemsCollection?: { __typename?: 'OrderItemsConnection', edges: Array<{ __typename?: 'OrderItemsEdge', node: { __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null } }> } | null } }> } | null };

export type OrdersByStatusAndUserQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrdersOrderBy> | OrdersOrderBy>;
  status: OrderStatus;
  userId: Scalars['UUID']['input'];
}>;


export type OrdersByStatusAndUserQuery = { __typename?: 'Query', ordersCollection?: { __typename?: 'OrdersConnection', edges: Array<{ __typename?: 'OrdersEdge', node: { __typename?: 'Orders', id: any, userId: any, orderStatus: OrderStatus, createdAt: any, updatedAt?: any | null, scheduledDeliveryAt?: any | null, deliveryAddress?: string | null, deliveryAddress1?: string | null, deliveryCity?: string | null, deliveryZip?: string | null, deliveryState?: string | null, deliveryLat?: number | null, deliveryLong?: number | null, notes?: string | null, subtotal?: any | null, tax?: any | null, total?: any | null, orderItemsCollection?: { __typename?: 'OrderItemsConnection', edges: Array<{ __typename?: 'OrderItemsEdge', node: { __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null } }> } | null } }> } | null };

export type CreateOrderMutationVariables = Exact<{
  input: OrdersInsertInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', insertIntoOrdersCollection?: { __typename?: 'OrdersInsertResponse', records: Array<{ __typename?: 'Orders', id: any, userId: any, orderStatus: OrderStatus, createdAt: any, updatedAt?: any | null, scheduledDeliveryAt?: any | null, deliveryAddress?: string | null, deliveryAddress1?: string | null, deliveryCity?: string | null, deliveryZip?: string | null, deliveryState?: string | null, deliveryLat?: number | null, deliveryLong?: number | null, notes?: string | null, subtotal?: any | null, tax?: any | null, total?: any | null, orderItemsCollection?: { __typename?: 'OrderItemsConnection', edges: Array<{ __typename?: 'OrderItemsEdge', node: { __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null } }> } | null }> } | null };

export type UpdateOrderMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: OrdersUpdateInput;
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrdersCollection: { __typename?: 'OrdersUpdateResponse', records: Array<{ __typename?: 'Orders', id: any, userId: any, orderStatus: OrderStatus, createdAt: any, updatedAt?: any | null, scheduledDeliveryAt?: any | null, deliveryAddress?: string | null, deliveryAddress1?: string | null, deliveryCity?: string | null, deliveryZip?: string | null, deliveryState?: string | null, deliveryLat?: number | null, deliveryLong?: number | null, notes?: string | null, subtotal?: any | null, tax?: any | null, total?: any | null, orderItemsCollection?: { __typename?: 'OrderItemsConnection', edges: Array<{ __typename?: 'OrderItemsEdge', node: { __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null } }> } | null }> } };

export type DeleteOrderMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteOrderMutation = { __typename?: 'Mutation', deleteFromOrdersCollection: { __typename?: 'OrdersDeleteResponse', affectedCount: number } };

export type OrderItemFragment = { __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null };

export type OrderItemsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrderItemsOrderBy> | OrderItemsOrderBy>;
}>;


export type OrderItemsQuery = { __typename?: 'Query', orderItemsCollection?: { __typename?: 'OrderItemsConnection', edges: Array<{ __typename?: 'OrderItemsEdge', node: { __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null } }> } | null };

export type OrderItemsByOrderQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrderItemsOrderBy> | OrderItemsOrderBy>;
  orderId: Scalars['UUID']['input'];
}>;


export type OrderItemsByOrderQuery = { __typename?: 'Query', orderItemsCollection?: { __typename?: 'OrderItemsConnection', edges: Array<{ __typename?: 'OrderItemsEdge', node: { __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null } }> } | null };

export type CreateOrderItemMutationVariables = Exact<{
  input: OrderItemsInsertInput;
}>;


export type CreateOrderItemMutation = { __typename?: 'Mutation', insertIntoOrderItemsCollection?: { __typename?: 'OrderItemsInsertResponse', records: Array<{ __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null }> } | null };

export type UpdateOrderItemMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: OrderItemsUpdateInput;
}>;


export type UpdateOrderItemMutation = { __typename?: 'Mutation', updateOrderItemsCollection: { __typename?: 'OrderItemsUpdateResponse', records: Array<{ __typename?: 'OrderItems', id: any, orderId: any, productId?: any | null, quantity: number, createdAt: any, notes?: string | null, unitPrice: number, product?: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } | null }> } };

export type DeleteOrderItemMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteOrderItemMutation = { __typename?: 'Mutation', deleteFromOrderItemsCollection: { __typename?: 'OrderItemsDeleteResponse', affectedCount: number } };

export type ProductFragment = { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null };

export type ProductsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProductsOrderBy> | ProductsOrderBy>;
}>;


export type ProductsQuery = { __typename?: 'Query', productsCollection?: { __typename?: 'ProductsConnection', edges: Array<{ __typename?: 'ProductsEdge', node: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } }> } | null };

export type ProductQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type ProductQuery = { __typename?: 'Query', productsCollection?: { __typename?: 'ProductsConnection', edges: Array<{ __typename?: 'ProductsEdge', node: { __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null } }> } | null };

export type CreateProductMutationVariables = Exact<{
  input: ProductsInsertInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', insertIntoProductsCollection?: { __typename?: 'ProductsInsertResponse', records: Array<{ __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null }> } | null };

export type UpdateProductMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: ProductsUpdateInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProductsCollection: { __typename?: 'ProductsUpdateResponse', records: Array<{ __typename?: 'Products', id: any, productTypeId?: any | null, name: string, shortDescription?: string | null, longDescription?: string | null, photoUrl?: string | null, data?: any | null, createdAt: any, updatedAt?: any | null, unitPrice: number, unit?: string | null, instructions?: string | null, productType?: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } | null }> } };

export type DeleteProductMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteFromProductsCollection: { __typename?: 'ProductsDeleteResponse', affectedCount: number } };

export type ProductTypeFragment = { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any };

export type ProductTypesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProductTypesOrderBy> | ProductTypesOrderBy>;
}>;


export type ProductTypesQuery = { __typename?: 'Query', productTypesCollection?: { __typename?: 'ProductTypesConnection', edges: Array<{ __typename?: 'ProductTypesEdge', node: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } }> } | null };

export type ProductTypeQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type ProductTypeQuery = { __typename?: 'Query', productTypesCollection?: { __typename?: 'ProductTypesConnection', edges: Array<{ __typename?: 'ProductTypesEdge', node: { __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any } }> } | null };

export type CreateProductTypeMutationVariables = Exact<{
  input: ProductTypesInsertInput;
}>;


export type CreateProductTypeMutation = { __typename?: 'Mutation', insertIntoProductTypesCollection?: { __typename?: 'ProductTypesInsertResponse', records: Array<{ __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any }> } | null };

export type UpdateProductTypeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: ProductTypesUpdateInput;
}>;


export type UpdateProductTypeMutation = { __typename?: 'Mutation', updateProductTypesCollection: { __typename?: 'ProductTypesUpdateResponse', records: Array<{ __typename?: 'ProductTypes', id: any, name: string, key: string, schema?: any | null, iconUrl?: string | null, coverUrl?: string | null, createdAt: any }> } };

export type DeleteProductTypeMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteProductTypeMutation = { __typename?: 'Mutation', deleteFromProductTypesCollection: { __typename?: 'ProductTypesDeleteResponse', affectedCount: number } };

export type StationFragment = { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any };

export type StationsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  after?: InputMaybe<Scalars['Cursor']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StationsOrderBy> | StationsOrderBy>;
}>;


export type StationsQuery = { __typename?: 'Query', stationsCollection?: { __typename?: 'StationsConnection', edges: Array<{ __typename?: 'StationsEdge', node: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } }> } | null };

export type StationQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type StationQuery = { __typename?: 'Query', stationsCollection?: { __typename?: 'StationsConnection', edges: Array<{ __typename?: 'StationsEdge', node: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } }> } | null };

export type CreateStationMutationVariables = Exact<{
  input: StationsInsertInput;
}>;


export type CreateStationMutation = { __typename?: 'Mutation', insertIntoStationsCollection?: { __typename?: 'StationsInsertResponse', records: Array<{ __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any }> } | null };

export type UpdateStationMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: StationsUpdateInput;
}>;


export type UpdateStationMutation = { __typename?: 'Mutation', updateStationsCollection: { __typename?: 'StationsUpdateResponse', records: Array<{ __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any }> } };

export type DeleteStationMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteStationMutation = { __typename?: 'Mutation', deleteFromStationsCollection: { __typename?: 'StationsDeleteResponse', affectedCount: number } };

export type StationsByRegistrationCodeQueryVariables = Exact<{
  registrationCode: Scalars['String']['input'];
}>;


export type StationsByRegistrationCodeQuery = { __typename?: 'Query', stationsCollection?: { __typename?: 'StationsConnection', edges: Array<{ __typename?: 'StationsEdge', node: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } }> } | null };

export type UserStationFragment = { __typename?: 'UserStations', id: any, userId: any, stationId: any, station: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } };

export type UserStationsQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type UserStationsQuery = { __typename?: 'Query', userStationsCollection?: { __typename?: 'UserStationsConnection', edges: Array<{ __typename?: 'UserStationsEdge', node: { __typename?: 'UserStations', id: any, userId: any, stationId: any, station: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } } }> } | null };

export type UserStationsByStationQueryVariables = Exact<{
  stationId: Scalars['UUID']['input'];
}>;


export type UserStationsByStationQuery = { __typename?: 'Query', userStationsCollection?: { __typename?: 'UserStationsConnection', edges: Array<{ __typename?: 'UserStationsEdge', node: { __typename?: 'UserStations', id: any, userId: any, stationId: any, station: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } } }> } | null };

export type UserStationsByUserQueryVariables = Exact<{
  userId: Scalars['UUID']['input'];
}>;


export type UserStationsByUserQuery = { __typename?: 'Query', userStationsCollection?: { __typename?: 'UserStationsConnection', edges: Array<{ __typename?: 'UserStationsEdge', node: { __typename?: 'UserStations', id: any, userId: any, stationId: any, station: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } } }> } | null };

export type RoleFragment = { __typename?: 'Roles', id: any, name: string, key: string, createdAt: any };

export type UserRoleFragment = { __typename?: 'UserRoles', id: any, userId: any, roleId: any, role: { __typename?: 'Roles', id: any, name: string, key: string, createdAt: any } };

export type UserFragment = { __typename?: 'Users', id: any, did: string, handle: string, pdsUrl: string, lastName: string, firstName: string, email: string, metadata?: any | null, createdAt: any, updatedAt?: any | null, primaryStationId?: any | null, userRolesCollection?: { __typename?: 'UserRolesConnection', edges: Array<{ __typename?: 'UserRolesEdge', node: { __typename?: 'UserRoles', id: any, userId: any, roleId: any, role: { __typename?: 'Roles', id: any, name: string, key: string, createdAt: any } } }> } | null, primaryStation?: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } | null, userStationsCollection?: { __typename?: 'UserStationsConnection', edges: Array<{ __typename?: 'UserStationsEdge', node: { __typename?: 'UserStations', id: any, userId: any, stationId: any, station: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } } }> } | null };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', usersCollection?: { __typename?: 'UsersConnection', edges: Array<{ __typename?: 'UsersEdge', node: { __typename?: 'Users', id: any, did: string, handle: string, pdsUrl: string, lastName: string, firstName: string, email: string, metadata?: any | null, createdAt: any, updatedAt?: any | null, primaryStationId?: any | null, userRolesCollection?: { __typename?: 'UserRolesConnection', edges: Array<{ __typename?: 'UserRolesEdge', node: { __typename?: 'UserRoles', id: any, userId: any, roleId: any, role: { __typename?: 'Roles', id: any, name: string, key: string, createdAt: any } } }> } | null, primaryStation?: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } | null, userStationsCollection?: { __typename?: 'UserStationsConnection', edges: Array<{ __typename?: 'UserStationsEdge', node: { __typename?: 'UserStations', id: any, userId: any, stationId: any, station: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } } }> } | null } }> } | null };

export type UserQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', usersCollection?: { __typename?: 'UsersConnection', edges: Array<{ __typename?: 'UsersEdge', node: { __typename?: 'Users', id: any, did: string, handle: string, pdsUrl: string, lastName: string, firstName: string, email: string, metadata?: any | null, createdAt: any, updatedAt?: any | null, primaryStationId?: any | null, userRolesCollection?: { __typename?: 'UserRolesConnection', edges: Array<{ __typename?: 'UserRolesEdge', node: { __typename?: 'UserRoles', id: any, userId: any, roleId: any, role: { __typename?: 'Roles', id: any, name: string, key: string, createdAt: any } } }> } | null, primaryStation?: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } | null, userStationsCollection?: { __typename?: 'UserStationsConnection', edges: Array<{ __typename?: 'UserStationsEdge', node: { __typename?: 'UserStations', id: any, userId: any, stationId: any, station: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } } }> } | null } }> } | null };

export type RolesQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesQuery = { __typename?: 'Query', rolesCollection?: { __typename?: 'RolesConnection', edges: Array<{ __typename?: 'RolesEdge', node: { __typename?: 'Roles', id: any, name: string, key: string, createdAt: any } }> } | null };

export type RoleQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RoleQuery = { __typename?: 'Query', rolesCollection?: { __typename?: 'RolesConnection', edges: Array<{ __typename?: 'RolesEdge', node: { __typename?: 'Roles', id: any, name: string, key: string, createdAt: any } }> } | null };

export type PermissionFragment = { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any };

export type PermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PermissionsQuery = { __typename?: 'Query', permissionsCollection?: { __typename?: 'PermissionsConnection', edges: Array<{ __typename?: 'PermissionsEdge', node: { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any } }> } | null };

export type PermissionQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type PermissionQuery = { __typename?: 'Query', permissionsCollection?: { __typename?: 'PermissionsConnection', edges: Array<{ __typename?: 'PermissionsEdge', node: { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any } }> } | null };

export type CreatePermissionMutationVariables = Exact<{
  input: PermissionsInsertInput;
}>;


export type CreatePermissionMutation = { __typename?: 'Mutation', insertIntoPermissionsCollection?: { __typename?: 'PermissionsInsertResponse', records: Array<{ __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any }> } | null };

export type UpdatePermissionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: PermissionsUpdateInput;
}>;


export type UpdatePermissionMutation = { __typename?: 'Mutation', updatePermissionsCollection: { __typename?: 'PermissionsUpdateResponse', records: Array<{ __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any }> } };

export type DeletePermissionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeletePermissionMutation = { __typename?: 'Mutation', deleteFromPermissionsCollection: { __typename?: 'PermissionsDeleteResponse', affectedCount: number } };

export type CreateRoleMutationVariables = Exact<{
  input: RolesInsertInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', insertIntoRolesCollection?: { __typename?: 'RolesInsertResponse', records: Array<{ __typename?: 'Roles', id: any, name: string, key: string, createdAt: any }> } | null };

export type UpdateRoleMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: RolesUpdateInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRolesCollection: { __typename?: 'RolesUpdateResponse', records: Array<{ __typename?: 'Roles', id: any, name: string, key: string, createdAt: any }> } };

export type DeleteRoleMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteRoleMutation = { __typename?: 'Mutation', deleteFromRolesCollection: { __typename?: 'RolesDeleteResponse', affectedCount: number } };

export type CreateUserMutationVariables = Exact<{
  input: UsersInsertInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', insertIntoUsersCollection?: { __typename?: 'UsersInsertResponse', records: Array<{ __typename?: 'Users', id: any, did: string, handle: string, pdsUrl: string, lastName: string, firstName: string, email: string, metadata?: any | null, createdAt: any, updatedAt?: any | null, primaryStationId?: any | null, userRolesCollection?: { __typename?: 'UserRolesConnection', edges: Array<{ __typename?: 'UserRolesEdge', node: { __typename?: 'UserRoles', id: any, userId: any, roleId: any, role: { __typename?: 'Roles', id: any, name: string, key: string, createdAt: any } } }> } | null, primaryStation?: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } | null, userStationsCollection?: { __typename?: 'UserStationsConnection', edges: Array<{ __typename?: 'UserStationsEdge', node: { __typename?: 'UserStations', id: any, userId: any, stationId: any, station: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } } }> } | null }> } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: UsersUpdateInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUsersCollection: { __typename?: 'UsersUpdateResponse', records: Array<{ __typename?: 'Users', id: any, did: string, handle: string, pdsUrl: string, lastName: string, firstName: string, email: string, metadata?: any | null, createdAt: any, updatedAt?: any | null, primaryStationId?: any | null, userRolesCollection?: { __typename?: 'UserRolesConnection', edges: Array<{ __typename?: 'UserRolesEdge', node: { __typename?: 'UserRoles', id: any, userId: any, roleId: any, role: { __typename?: 'Roles', id: any, name: string, key: string, createdAt: any } } }> } | null, primaryStation?: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } | null, userStationsCollection?: { __typename?: 'UserStationsConnection', edges: Array<{ __typename?: 'UserStationsEdge', node: { __typename?: 'UserStations', id: any, userId: any, stationId: any, station: { __typename?: 'Stations', id: any, name: string, number?: number | null, address: string, address1?: string | null, city: string, state: string, zip: string, latitude?: number | null, longitude?: number | null, description?: string | null, longDescription?: string | null, registrationCode: string, imageUrl?: string | null, coverUrl?: string | null, createdAt: any } } }> } | null }> } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteFromUsersCollection: { __typename?: 'UsersDeleteResponse', affectedCount: number } };

export type CreateUserRoleMutationVariables = Exact<{
  input: UserRolesInsertInput;
}>;


export type CreateUserRoleMutation = { __typename?: 'Mutation', insertIntoUserRolesCollection?: { __typename?: 'UserRolesInsertResponse', records: Array<{ __typename?: 'UserRoles', id: any, userId: any, roleId: any, role: { __typename?: 'Roles', id: any, name: string, key: string, createdAt: any } }> } | null };

export type UpdateUserRoleMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: UserRolesUpdateInput;
}>;


export type UpdateUserRoleMutation = { __typename?: 'Mutation', updateUserRolesCollection: { __typename?: 'UserRolesUpdateResponse', records: Array<{ __typename?: 'UserRoles', id: any, userId: any, roleId: any, role: { __typename?: 'Roles', id: any, name: string, key: string, createdAt: any } }> } };

export type DeleteUserRoleMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteUserRoleMutation = { __typename?: 'Mutation', deleteFromUserRolesCollection: { __typename?: 'UserRolesDeleteResponse', affectedCount: number } };

export type UserPermissionFragment = { __typename?: 'UserPermissions', id: any, userId: any, permissionId: any, permission: { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any } };

export type UserPermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserPermissionsQuery = { __typename?: 'Query', userPermissionsCollection?: { __typename?: 'UserPermissionsConnection', edges: Array<{ __typename?: 'UserPermissionsEdge', node: { __typename?: 'UserPermissions', id: any, userId: any, permissionId: any, permission: { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any } } }> } | null };

export type UserPermissionQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type UserPermissionQuery = { __typename?: 'Query', userPermissionsCollection?: { __typename?: 'UserPermissionsConnection', edges: Array<{ __typename?: 'UserPermissionsEdge', node: { __typename?: 'UserPermissions', id: any, userId: any, permissionId: any, permission: { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any } } }> } | null };

export type CreateUserPermissionMutationVariables = Exact<{
  input: UserPermissionsInsertInput;
}>;


export type CreateUserPermissionMutation = { __typename?: 'Mutation', insertIntoUserPermissionsCollection?: { __typename?: 'UserPermissionsInsertResponse', records: Array<{ __typename?: 'UserPermissions', id: any, userId: any, permissionId: any, permission: { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any } }> } | null };

export type UpdateUserPermissionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: UserPermissionsUpdateInput;
}>;


export type UpdateUserPermissionMutation = { __typename?: 'Mutation', updateUserPermissionsCollection: { __typename?: 'UserPermissionsUpdateResponse', records: Array<{ __typename?: 'UserPermissions', id: any, userId: any, permissionId: any, permission: { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any } }> } };

export type DeleteUserPermissionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteUserPermissionMutation = { __typename?: 'Mutation', deleteFromUserPermissionsCollection: { __typename?: 'UserPermissionsDeleteResponse', affectedCount: number } };

export type RolePermissionFragment = { __typename?: 'RolePermissions', id: any, roleId: any, permissionId: any, permission: { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any } };

export type RolePermissionsQueryVariables = Exact<{ [key: string]: never; }>;


export type RolePermissionsQuery = { __typename?: 'Query', rolePermissionsCollection?: { __typename?: 'RolePermissionsConnection', edges: Array<{ __typename?: 'RolePermissionsEdge', node: { __typename?: 'RolePermissions', id: any, roleId: any, permissionId: any, permission: { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any } } }> } | null };

export type RolePermissionQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type RolePermissionQuery = { __typename?: 'Query', rolePermissionsCollection?: { __typename?: 'RolePermissionsConnection', edges: Array<{ __typename?: 'RolePermissionsEdge', node: { __typename?: 'RolePermissions', id: any, roleId: any, permissionId: any, permission: { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any } } }> } | null };

export type CreateRolePermissionMutationVariables = Exact<{
  input: RolePermissionsInsertInput;
}>;


export type CreateRolePermissionMutation = { __typename?: 'Mutation', insertIntoRolePermissionsCollection?: { __typename?: 'RolePermissionsInsertResponse', records: Array<{ __typename?: 'RolePermissions', id: any, roleId: any, permissionId: any, permission: { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any } }> } | null };

export type UpdateRolePermissionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
  input: RolePermissionsUpdateInput;
}>;


export type UpdateRolePermissionMutation = { __typename?: 'Mutation', updateRolePermissionsCollection: { __typename?: 'RolePermissionsUpdateResponse', records: Array<{ __typename?: 'RolePermissions', id: any, roleId: any, permissionId: any, permission: { __typename?: 'Permissions', id: any, name: string, key: string, createdAt: any } }> } };

export type DeleteRolePermissionMutationVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type DeleteRolePermissionMutation = { __typename?: 'Mutation', deleteFromRolePermissionsCollection: { __typename?: 'RolePermissionsDeleteResponse', affectedCount: number } };

export const NavigationItemFragmentDoc = gql`
    fragment NavigationItem on NavigationItems {
  id
  navigationId
  parentId
  name
  path
  iconName
  tag
  data
  roles
  createdAt
  index
}
    `;
export const NavigationFragmentDoc = gql`
    fragment Navigation on Navigation {
  id
  name
  key
  data
  createdAt
  navigationItemsCollection(orderBy: [{index: AscNullsLast}]) {
    edges {
      node {
        ...NavigationItem
      }
    }
  }
}
    ${NavigationItemFragmentDoc}`;
export const NotificationFragmentDoc = gql`
    fragment Notification on Notifications {
  id
  title
  subtitle
  createdAt
  data
  isRead
  iconUrl
  messageMarkdown
  notificationTypeId
  notificationType {
    id
    iconUrl
    name
    schema
    createdAt
  }
}
    `;
export const NotificationTypeFragmentDoc = gql`
    fragment NotificationType on NotificationTypes {
  id
  name
  key
  iconUrl
  createdAt
}
    `;
export const ProductTypeFragmentDoc = gql`
    fragment ProductType on ProductTypes {
  id
  name
  key
  schema
  iconUrl
  coverUrl
  createdAt
}
    `;
export const ProductFragmentDoc = gql`
    fragment Product on Products {
  id
  productTypeId
  name
  shortDescription
  longDescription
  photoUrl
  data
  createdAt
  updatedAt
  unitPrice
  unit
  instructions
  productType {
    ...ProductType
  }
}
    ${ProductTypeFragmentDoc}`;
export const OrderItemFragmentDoc = gql`
    fragment OrderItem on OrderItems {
  id
  orderId
  productId
  product {
    ...Product
  }
  quantity
  createdAt
  notes
  unitPrice
}
    ${ProductFragmentDoc}`;
export const OrderFragmentDoc = gql`
    fragment Order on Orders {
  id
  userId
  orderStatus
  createdAt
  updatedAt
  scheduledDeliveryAt
  deliveryAddress
  deliveryAddress1
  deliveryCity
  deliveryZip
  deliveryState
  deliveryLat
  deliveryLong
  notes
  subtotal
  tax
  total
  orderItemsCollection {
    edges {
      node {
        ...OrderItem
      }
    }
  }
}
    ${OrderItemFragmentDoc}`;
export const RoleFragmentDoc = gql`
    fragment Role on Roles {
  id
  name
  key
  createdAt
}
    `;
export const UserRoleFragmentDoc = gql`
    fragment UserRole on UserRoles {
  id
  userId
  roleId
  role {
    ...Role
  }
}
    ${RoleFragmentDoc}`;
export const StationFragmentDoc = gql`
    fragment Station on Stations {
  id
  name
  number
  address
  address1
  city
  state
  zip
  latitude
  longitude
  description
  longDescription
  registrationCode
  imageUrl
  coverUrl
  createdAt
}
    `;
export const UserStationFragmentDoc = gql`
    fragment UserStation on UserStations {
  id
  userId
  stationId
  station {
    ...Station
  }
}
    ${StationFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on Users {
  id
  did
  handle
  pdsUrl
  lastName
  firstName
  email
  metadata
  createdAt
  updatedAt
  userRolesCollection {
    edges {
      node {
        ...UserRole
      }
    }
  }
  primaryStationId
  primaryStation {
    ...Station
  }
  userStationsCollection {
    edges {
      node {
        ...UserStation
      }
    }
  }
}
    ${UserRoleFragmentDoc}
${StationFragmentDoc}
${UserStationFragmentDoc}`;
export const PermissionFragmentDoc = gql`
    fragment Permission on Permissions {
  id
  name
  key
  createdAt
}
    `;
export const UserPermissionFragmentDoc = gql`
    fragment UserPermission on UserPermissions {
  id
  userId
  permissionId
  permission {
    ...Permission
  }
}
    ${PermissionFragmentDoc}`;
export const RolePermissionFragmentDoc = gql`
    fragment RolePermission on RolePermissions {
  id
  roleId
  permissionId
  permission {
    ...Permission
  }
}
    ${PermissionFragmentDoc}`;
export const NavigationDocument = gql`
    query Navigation {
  navigationCollection {
    edges {
      node {
        ...Navigation
      }
    }
  }
}
    ${NavigationFragmentDoc}`;

/**
 * __useNavigationQuery__
 *
 * To run a query within a React component, call `useNavigationQuery` and pass it any options that fit your needs.
 * When your component renders, `useNavigationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNavigationQuery({
 *   variables: {
 *   },
 * });
 */
export function useNavigationQuery(baseOptions?: Apollo.QueryHookOptions<NavigationQuery, NavigationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NavigationQuery, NavigationQueryVariables>(NavigationDocument, options);
      }
export function useNavigationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NavigationQuery, NavigationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NavigationQuery, NavigationQueryVariables>(NavigationDocument, options);
        }
export function useNavigationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<NavigationQuery, NavigationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NavigationQuery, NavigationQueryVariables>(NavigationDocument, options);
        }
export type NavigationQueryHookResult = ReturnType<typeof useNavigationQuery>;
export type NavigationLazyQueryHookResult = ReturnType<typeof useNavigationLazyQuery>;
export type NavigationSuspenseQueryHookResult = ReturnType<typeof useNavigationSuspenseQuery>;
export type NavigationQueryResult = Apollo.QueryResult<NavigationQuery, NavigationQueryVariables>;
export const AdminNavigationDocument = gql`
    query AdminNavigation {
  navigationCollection(filter: {key: {eq: "admin"}}) {
    edges {
      node {
        ...Navigation
      }
    }
  }
}
    ${NavigationFragmentDoc}`;

/**
 * __useAdminNavigationQuery__
 *
 * To run a query within a React component, call `useAdminNavigationQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminNavigationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminNavigationQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminNavigationQuery(baseOptions?: Apollo.QueryHookOptions<AdminNavigationQuery, AdminNavigationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdminNavigationQuery, AdminNavigationQueryVariables>(AdminNavigationDocument, options);
      }
export function useAdminNavigationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdminNavigationQuery, AdminNavigationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdminNavigationQuery, AdminNavigationQueryVariables>(AdminNavigationDocument, options);
        }
export function useAdminNavigationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AdminNavigationQuery, AdminNavigationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AdminNavigationQuery, AdminNavigationQueryVariables>(AdminNavigationDocument, options);
        }
export type AdminNavigationQueryHookResult = ReturnType<typeof useAdminNavigationQuery>;
export type AdminNavigationLazyQueryHookResult = ReturnType<typeof useAdminNavigationLazyQuery>;
export type AdminNavigationSuspenseQueryHookResult = ReturnType<typeof useAdminNavigationSuspenseQuery>;
export type AdminNavigationQueryResult = Apollo.QueryResult<AdminNavigationQuery, AdminNavigationQueryVariables>;
export const TopNavigationDocument = gql`
    query TopNavigation {
  navigationCollection(filter: {key: {eq: "top"}}) {
    edges {
      node {
        ...Navigation
      }
    }
  }
}
    ${NavigationFragmentDoc}`;

/**
 * __useTopNavigationQuery__
 *
 * To run a query within a React component, call `useTopNavigationQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopNavigationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopNavigationQuery({
 *   variables: {
 *   },
 * });
 */
export function useTopNavigationQuery(baseOptions?: Apollo.QueryHookOptions<TopNavigationQuery, TopNavigationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TopNavigationQuery, TopNavigationQueryVariables>(TopNavigationDocument, options);
      }
export function useTopNavigationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopNavigationQuery, TopNavigationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TopNavigationQuery, TopNavigationQueryVariables>(TopNavigationDocument, options);
        }
export function useTopNavigationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TopNavigationQuery, TopNavigationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TopNavigationQuery, TopNavigationQueryVariables>(TopNavigationDocument, options);
        }
export type TopNavigationQueryHookResult = ReturnType<typeof useTopNavigationQuery>;
export type TopNavigationLazyQueryHookResult = ReturnType<typeof useTopNavigationLazyQuery>;
export type TopNavigationSuspenseQueryHookResult = ReturnType<typeof useTopNavigationSuspenseQuery>;
export type TopNavigationQueryResult = Apollo.QueryResult<TopNavigationQuery, TopNavigationQueryVariables>;
export const CreateNavigationDocument = gql`
    mutation CreateNavigation($input: NavigationInsertInput!) {
  insertIntoNavigationCollection(objects: [$input]) {
    records {
      ...Navigation
    }
  }
}
    ${NavigationFragmentDoc}`;
export type CreateNavigationMutationFn = Apollo.MutationFunction<CreateNavigationMutation, CreateNavigationMutationVariables>;

/**
 * __useCreateNavigationMutation__
 *
 * To run a mutation, you first call `useCreateNavigationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNavigationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNavigationMutation, { data, loading, error }] = useCreateNavigationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNavigationMutation(baseOptions?: Apollo.MutationHookOptions<CreateNavigationMutation, CreateNavigationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNavigationMutation, CreateNavigationMutationVariables>(CreateNavigationDocument, options);
      }
export type CreateNavigationMutationHookResult = ReturnType<typeof useCreateNavigationMutation>;
export type CreateNavigationMutationResult = Apollo.MutationResult<CreateNavigationMutation>;
export type CreateNavigationMutationOptions = Apollo.BaseMutationOptions<CreateNavigationMutation, CreateNavigationMutationVariables>;
export const UpdateNavigationDocument = gql`
    mutation UpdateNavigation($id: UUID!, $input: NavigationUpdateInput!) {
  updateNavigationCollection(set: $input, filter: {id: {eq: $id}}) {
    records {
      ...Navigation
    }
  }
}
    ${NavigationFragmentDoc}`;
export type UpdateNavigationMutationFn = Apollo.MutationFunction<UpdateNavigationMutation, UpdateNavigationMutationVariables>;

/**
 * __useUpdateNavigationMutation__
 *
 * To run a mutation, you first call `useUpdateNavigationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNavigationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNavigationMutation, { data, loading, error }] = useUpdateNavigationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNavigationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNavigationMutation, UpdateNavigationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNavigationMutation, UpdateNavigationMutationVariables>(UpdateNavigationDocument, options);
      }
export type UpdateNavigationMutationHookResult = ReturnType<typeof useUpdateNavigationMutation>;
export type UpdateNavigationMutationResult = Apollo.MutationResult<UpdateNavigationMutation>;
export type UpdateNavigationMutationOptions = Apollo.BaseMutationOptions<UpdateNavigationMutation, UpdateNavigationMutationVariables>;
export const DeleteNavigationDocument = gql`
    mutation DeleteNavigation($id: UUID!) {
  deleteFromNavigationCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteNavigationMutationFn = Apollo.MutationFunction<DeleteNavigationMutation, DeleteNavigationMutationVariables>;

/**
 * __useDeleteNavigationMutation__
 *
 * To run a mutation, you first call `useDeleteNavigationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNavigationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNavigationMutation, { data, loading, error }] = useDeleteNavigationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNavigationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNavigationMutation, DeleteNavigationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNavigationMutation, DeleteNavigationMutationVariables>(DeleteNavigationDocument, options);
      }
export type DeleteNavigationMutationHookResult = ReturnType<typeof useDeleteNavigationMutation>;
export type DeleteNavigationMutationResult = Apollo.MutationResult<DeleteNavigationMutation>;
export type DeleteNavigationMutationOptions = Apollo.BaseMutationOptions<DeleteNavigationMutation, DeleteNavigationMutationVariables>;
export const CreateNavigationItemDocument = gql`
    mutation CreateNavigationItem($input: NavigationItemsInsertInput!) {
  insertIntoNavigationItemsCollection(objects: [$input]) {
    records {
      ...NavigationItem
    }
  }
}
    ${NavigationItemFragmentDoc}`;
export type CreateNavigationItemMutationFn = Apollo.MutationFunction<CreateNavigationItemMutation, CreateNavigationItemMutationVariables>;

/**
 * __useCreateNavigationItemMutation__
 *
 * To run a mutation, you first call `useCreateNavigationItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNavigationItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNavigationItemMutation, { data, loading, error }] = useCreateNavigationItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNavigationItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateNavigationItemMutation, CreateNavigationItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNavigationItemMutation, CreateNavigationItemMutationVariables>(CreateNavigationItemDocument, options);
      }
export type CreateNavigationItemMutationHookResult = ReturnType<typeof useCreateNavigationItemMutation>;
export type CreateNavigationItemMutationResult = Apollo.MutationResult<CreateNavigationItemMutation>;
export type CreateNavigationItemMutationOptions = Apollo.BaseMutationOptions<CreateNavigationItemMutation, CreateNavigationItemMutationVariables>;
export const UpdateNavigationItemDocument = gql`
    mutation UpdateNavigationItem($id: UUID!, $input: NavigationItemsUpdateInput!) {
  updateNavigationItemsCollection(set: $input, filter: {id: {eq: $id}}) {
    records {
      ...NavigationItem
    }
  }
}
    ${NavigationItemFragmentDoc}`;
export type UpdateNavigationItemMutationFn = Apollo.MutationFunction<UpdateNavigationItemMutation, UpdateNavigationItemMutationVariables>;

/**
 * __useUpdateNavigationItemMutation__
 *
 * To run a mutation, you first call `useUpdateNavigationItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNavigationItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNavigationItemMutation, { data, loading, error }] = useUpdateNavigationItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNavigationItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNavigationItemMutation, UpdateNavigationItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNavigationItemMutation, UpdateNavigationItemMutationVariables>(UpdateNavigationItemDocument, options);
      }
export type UpdateNavigationItemMutationHookResult = ReturnType<typeof useUpdateNavigationItemMutation>;
export type UpdateNavigationItemMutationResult = Apollo.MutationResult<UpdateNavigationItemMutation>;
export type UpdateNavigationItemMutationOptions = Apollo.BaseMutationOptions<UpdateNavigationItemMutation, UpdateNavigationItemMutationVariables>;
export const DeleteNavigationItemDocument = gql`
    mutation DeleteNavigationItem($id: UUID!) {
  deleteFromNavigationItemsCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteNavigationItemMutationFn = Apollo.MutationFunction<DeleteNavigationItemMutation, DeleteNavigationItemMutationVariables>;

/**
 * __useDeleteNavigationItemMutation__
 *
 * To run a mutation, you first call `useDeleteNavigationItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNavigationItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNavigationItemMutation, { data, loading, error }] = useDeleteNavigationItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNavigationItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNavigationItemMutation, DeleteNavigationItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNavigationItemMutation, DeleteNavigationItemMutationVariables>(DeleteNavigationItemDocument, options);
      }
export type DeleteNavigationItemMutationHookResult = ReturnType<typeof useDeleteNavigationItemMutation>;
export type DeleteNavigationItemMutationResult = Apollo.MutationResult<DeleteNavigationItemMutation>;
export type DeleteNavigationItemMutationOptions = Apollo.BaseMutationOptions<DeleteNavigationItemMutation, DeleteNavigationItemMutationVariables>;
export const NotificationsDocument = gql`
    query Notifications {
  notificationsCollection {
    edges {
      node {
        ...Notification
      }
    }
  }
}
    ${NotificationFragmentDoc}`;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export function useNotificationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsSuspenseQueryHookResult = ReturnType<typeof useNotificationsSuspenseQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const NotificationDocument = gql`
    query Notification($id: UUID!) {
  notificationsCollection(filter: {id: {eq: $id}}) {
    edges {
      node {
        ...Notification
      }
    }
  }
}
    ${NotificationFragmentDoc}`;

/**
 * __useNotificationQuery__
 *
 * To run a query within a React component, call `useNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNotificationQuery(baseOptions: Apollo.QueryHookOptions<NotificationQuery, NotificationQueryVariables> & ({ variables: NotificationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationQuery, NotificationQueryVariables>(NotificationDocument, options);
      }
export function useNotificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationQuery, NotificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationQuery, NotificationQueryVariables>(NotificationDocument, options);
        }
export function useNotificationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<NotificationQuery, NotificationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotificationQuery, NotificationQueryVariables>(NotificationDocument, options);
        }
export type NotificationQueryHookResult = ReturnType<typeof useNotificationQuery>;
export type NotificationLazyQueryHookResult = ReturnType<typeof useNotificationLazyQuery>;
export type NotificationSuspenseQueryHookResult = ReturnType<typeof useNotificationSuspenseQuery>;
export type NotificationQueryResult = Apollo.QueryResult<NotificationQuery, NotificationQueryVariables>;
export const CreateNotificationDocument = gql`
    mutation CreateNotification($input: NotificationsInsertInput!) {
  insertIntoNotificationsCollection(objects: [$input]) {
    records {
      ...Notification
    }
  }
}
    ${NotificationFragmentDoc}`;
export type CreateNotificationMutationFn = Apollo.MutationFunction<CreateNotificationMutation, CreateNotificationMutationVariables>;

/**
 * __useCreateNotificationMutation__
 *
 * To run a mutation, you first call `useCreateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNotificationMutation, { data, loading, error }] = useCreateNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNotificationMutation(baseOptions?: Apollo.MutationHookOptions<CreateNotificationMutation, CreateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNotificationMutation, CreateNotificationMutationVariables>(CreateNotificationDocument, options);
      }
export type CreateNotificationMutationHookResult = ReturnType<typeof useCreateNotificationMutation>;
export type CreateNotificationMutationResult = Apollo.MutationResult<CreateNotificationMutation>;
export type CreateNotificationMutationOptions = Apollo.BaseMutationOptions<CreateNotificationMutation, CreateNotificationMutationVariables>;
export const UpdateNotificationDocument = gql`
    mutation UpdateNotification($id: UUID!, $input: NotificationsUpdateInput!) {
  updateNotificationsCollection(set: $input, filter: {id: {eq: $id}}) {
    records {
      ...Notification
    }
  }
}
    ${NotificationFragmentDoc}`;
export type UpdateNotificationMutationFn = Apollo.MutationFunction<UpdateNotificationMutation, UpdateNotificationMutationVariables>;

/**
 * __useUpdateNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationMutation, { data, loading, error }] = useUpdateNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNotificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationMutation, UpdateNotificationMutationVariables>(UpdateNotificationDocument, options);
      }
export type UpdateNotificationMutationHookResult = ReturnType<typeof useUpdateNotificationMutation>;
export type UpdateNotificationMutationResult = Apollo.MutationResult<UpdateNotificationMutation>;
export type UpdateNotificationMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>;
export const DeleteNotificationDocument = gql`
    mutation DeleteNotification($id: UUID!) {
  deleteFromNotificationsCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteNotificationMutationFn = Apollo.MutationFunction<DeleteNotificationMutation, DeleteNotificationMutationVariables>;

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(DeleteNotificationDocument, options);
      }
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>;
export type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>;
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationMutation, DeleteNotificationMutationVariables>;
export const NotificationTypesDocument = gql`
    query NotificationTypes {
  notificationTypesCollection {
    edges {
      node {
        ...NotificationType
      }
    }
  }
}
    ${NotificationTypeFragmentDoc}`;

/**
 * __useNotificationTypesQuery__
 *
 * To run a query within a React component, call `useNotificationTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationTypesQuery(baseOptions?: Apollo.QueryHookOptions<NotificationTypesQuery, NotificationTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationTypesQuery, NotificationTypesQueryVariables>(NotificationTypesDocument, options);
      }
export function useNotificationTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationTypesQuery, NotificationTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationTypesQuery, NotificationTypesQueryVariables>(NotificationTypesDocument, options);
        }
export function useNotificationTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<NotificationTypesQuery, NotificationTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotificationTypesQuery, NotificationTypesQueryVariables>(NotificationTypesDocument, options);
        }
export type NotificationTypesQueryHookResult = ReturnType<typeof useNotificationTypesQuery>;
export type NotificationTypesLazyQueryHookResult = ReturnType<typeof useNotificationTypesLazyQuery>;
export type NotificationTypesSuspenseQueryHookResult = ReturnType<typeof useNotificationTypesSuspenseQuery>;
export type NotificationTypesQueryResult = Apollo.QueryResult<NotificationTypesQuery, NotificationTypesQueryVariables>;
export const NotificationTypeDocument = gql`
    query NotificationType($id: UUID!) {
  notificationTypesCollection(filter: {id: {eq: $id}}) {
    edges {
      node {
        ...NotificationType
      }
    }
  }
}
    ${NotificationTypeFragmentDoc}`;

/**
 * __useNotificationTypeQuery__
 *
 * To run a query within a React component, call `useNotificationTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationTypeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNotificationTypeQuery(baseOptions: Apollo.QueryHookOptions<NotificationTypeQuery, NotificationTypeQueryVariables> & ({ variables: NotificationTypeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationTypeQuery, NotificationTypeQueryVariables>(NotificationTypeDocument, options);
      }
export function useNotificationTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationTypeQuery, NotificationTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationTypeQuery, NotificationTypeQueryVariables>(NotificationTypeDocument, options);
        }
export function useNotificationTypeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<NotificationTypeQuery, NotificationTypeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotificationTypeQuery, NotificationTypeQueryVariables>(NotificationTypeDocument, options);
        }
export type NotificationTypeQueryHookResult = ReturnType<typeof useNotificationTypeQuery>;
export type NotificationTypeLazyQueryHookResult = ReturnType<typeof useNotificationTypeLazyQuery>;
export type NotificationTypeSuspenseQueryHookResult = ReturnType<typeof useNotificationTypeSuspenseQuery>;
export type NotificationTypeQueryResult = Apollo.QueryResult<NotificationTypeQuery, NotificationTypeQueryVariables>;
export const CreateNotificationTypeDocument = gql`
    mutation CreateNotificationType($input: NotificationTypesInsertInput!) {
  insertIntoNotificationTypesCollection(objects: [$input]) {
    records {
      ...NotificationType
    }
  }
}
    ${NotificationTypeFragmentDoc}`;
export type CreateNotificationTypeMutationFn = Apollo.MutationFunction<CreateNotificationTypeMutation, CreateNotificationTypeMutationVariables>;

/**
 * __useCreateNotificationTypeMutation__
 *
 * To run a mutation, you first call `useCreateNotificationTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNotificationTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNotificationTypeMutation, { data, loading, error }] = useCreateNotificationTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNotificationTypeMutation(baseOptions?: Apollo.MutationHookOptions<CreateNotificationTypeMutation, CreateNotificationTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNotificationTypeMutation, CreateNotificationTypeMutationVariables>(CreateNotificationTypeDocument, options);
      }
export type CreateNotificationTypeMutationHookResult = ReturnType<typeof useCreateNotificationTypeMutation>;
export type CreateNotificationTypeMutationResult = Apollo.MutationResult<CreateNotificationTypeMutation>;
export type CreateNotificationTypeMutationOptions = Apollo.BaseMutationOptions<CreateNotificationTypeMutation, CreateNotificationTypeMutationVariables>;
export const UpdateNotificationTypeDocument = gql`
    mutation UpdateNotificationType($id: UUID!, $input: NotificationTypesUpdateInput!) {
  updateNotificationTypesCollection(set: $input, filter: {id: {eq: $id}}) {
    records {
      ...NotificationType
    }
  }
}
    ${NotificationTypeFragmentDoc}`;
export type UpdateNotificationTypeMutationFn = Apollo.MutationFunction<UpdateNotificationTypeMutation, UpdateNotificationTypeMutationVariables>;

/**
 * __useUpdateNotificationTypeMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationTypeMutation, { data, loading, error }] = useUpdateNotificationTypeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNotificationTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationTypeMutation, UpdateNotificationTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationTypeMutation, UpdateNotificationTypeMutationVariables>(UpdateNotificationTypeDocument, options);
      }
export type UpdateNotificationTypeMutationHookResult = ReturnType<typeof useUpdateNotificationTypeMutation>;
export type UpdateNotificationTypeMutationResult = Apollo.MutationResult<UpdateNotificationTypeMutation>;
export type UpdateNotificationTypeMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationTypeMutation, UpdateNotificationTypeMutationVariables>;
export const DeleteNotificationTypeDocument = gql`
    mutation DeleteNotificationType($id: UUID!) {
  deleteFromNotificationTypesCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteNotificationTypeMutationFn = Apollo.MutationFunction<DeleteNotificationTypeMutation, DeleteNotificationTypeMutationVariables>;

/**
 * __useDeleteNotificationTypeMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationTypeMutation, { data, loading, error }] = useDeleteNotificationTypeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNotificationTypeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteNotificationTypeMutation, DeleteNotificationTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteNotificationTypeMutation, DeleteNotificationTypeMutationVariables>(DeleteNotificationTypeDocument, options);
      }
export type DeleteNotificationTypeMutationHookResult = ReturnType<typeof useDeleteNotificationTypeMutation>;
export type DeleteNotificationTypeMutationResult = Apollo.MutationResult<DeleteNotificationTypeMutation>;
export type DeleteNotificationTypeMutationOptions = Apollo.BaseMutationOptions<DeleteNotificationTypeMutation, DeleteNotificationTypeMutationVariables>;
export const OrdersDocument = gql`
    query Orders($first: Int, $last: Int, $before: Cursor, $after: Cursor, $offset: Int, $orderBy: [OrdersOrderBy!]) {
  ordersCollection(
    first: $first
    last: $last
    before: $before
    after: $after
    offset: $offset
    orderBy: $orderBy
  ) {
    edges {
      node {
        ...Order
      }
    }
  }
}
    ${OrderFragmentDoc}`;

/**
 * __useOrdersQuery__
 *
 * To run a query within a React component, call `useOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useOrdersQuery(baseOptions?: Apollo.QueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
      }
export function useOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
        }
export function useOrdersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
        }
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>;
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>;
export type OrdersSuspenseQueryHookResult = ReturnType<typeof useOrdersSuspenseQuery>;
export type OrdersQueryResult = Apollo.QueryResult<OrdersQuery, OrdersQueryVariables>;
export const OrderDocument = gql`
    query Order($id: UUID!) {
  ordersCollection(first: 1, filter: {id: {eq: $id}}) {
    edges {
      node {
        ...Order
      }
    }
  }
}
    ${OrderFragmentDoc}`;

/**
 * __useOrderQuery__
 *
 * To run a query within a React component, call `useOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrderQuery(baseOptions: Apollo.QueryHookOptions<OrderQuery, OrderQueryVariables> & ({ variables: OrderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
      }
export function useOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderQuery, OrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
        }
export function useOrderSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderQuery, OrderQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
        }
export type OrderQueryHookResult = ReturnType<typeof useOrderQuery>;
export type OrderLazyQueryHookResult = ReturnType<typeof useOrderLazyQuery>;
export type OrderSuspenseQueryHookResult = ReturnType<typeof useOrderSuspenseQuery>;
export type OrderQueryResult = Apollo.QueryResult<OrderQuery, OrderQueryVariables>;
export const OrdersByUserDocument = gql`
    query OrdersByUser($first: Int, $last: Int, $before: Cursor, $after: Cursor, $offset: Int, $orderBy: [OrdersOrderBy!], $userId: UUID!) {
  ordersCollection(
    first: $first
    last: $last
    before: $before
    after: $after
    offset: $offset
    orderBy: $orderBy
    filter: {userId: {eq: $userId}}
  ) {
    edges {
      node {
        ...Order
      }
    }
  }
}
    ${OrderFragmentDoc}`;

/**
 * __useOrdersByUserQuery__
 *
 * To run a query within a React component, call `useOrdersByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersByUserQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useOrdersByUserQuery(baseOptions: Apollo.QueryHookOptions<OrdersByUserQuery, OrdersByUserQueryVariables> & ({ variables: OrdersByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersByUserQuery, OrdersByUserQueryVariables>(OrdersByUserDocument, options);
      }
export function useOrdersByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersByUserQuery, OrdersByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersByUserQuery, OrdersByUserQueryVariables>(OrdersByUserDocument, options);
        }
export function useOrdersByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrdersByUserQuery, OrdersByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrdersByUserQuery, OrdersByUserQueryVariables>(OrdersByUserDocument, options);
        }
export type OrdersByUserQueryHookResult = ReturnType<typeof useOrdersByUserQuery>;
export type OrdersByUserLazyQueryHookResult = ReturnType<typeof useOrdersByUserLazyQuery>;
export type OrdersByUserSuspenseQueryHookResult = ReturnType<typeof useOrdersByUserSuspenseQuery>;
export type OrdersByUserQueryResult = Apollo.QueryResult<OrdersByUserQuery, OrdersByUserQueryVariables>;
export const OrdersByStatusDocument = gql`
    query OrdersByStatus($first: Int, $last: Int, $before: Cursor, $after: Cursor, $offset: Int, $orderBy: [OrdersOrderBy!], $status: OrderStatus!) {
  ordersCollection(
    first: $first
    last: $last
    before: $before
    after: $after
    offset: $offset
    orderBy: $orderBy
    filter: {orderStatus: {eq: $status}}
  ) {
    edges {
      node {
        ...Order
      }
    }
  }
}
    ${OrderFragmentDoc}`;

/**
 * __useOrdersByStatusQuery__
 *
 * To run a query within a React component, call `useOrdersByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersByStatusQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useOrdersByStatusQuery(baseOptions: Apollo.QueryHookOptions<OrdersByStatusQuery, OrdersByStatusQueryVariables> & ({ variables: OrdersByStatusQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersByStatusQuery, OrdersByStatusQueryVariables>(OrdersByStatusDocument, options);
      }
export function useOrdersByStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersByStatusQuery, OrdersByStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersByStatusQuery, OrdersByStatusQueryVariables>(OrdersByStatusDocument, options);
        }
export function useOrdersByStatusSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrdersByStatusQuery, OrdersByStatusQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrdersByStatusQuery, OrdersByStatusQueryVariables>(OrdersByStatusDocument, options);
        }
export type OrdersByStatusQueryHookResult = ReturnType<typeof useOrdersByStatusQuery>;
export type OrdersByStatusLazyQueryHookResult = ReturnType<typeof useOrdersByStatusLazyQuery>;
export type OrdersByStatusSuspenseQueryHookResult = ReturnType<typeof useOrdersByStatusSuspenseQuery>;
export type OrdersByStatusQueryResult = Apollo.QueryResult<OrdersByStatusQuery, OrdersByStatusQueryVariables>;
export const OrdersByStatusAndUserDocument = gql`
    query OrdersByStatusAndUser($first: Int, $last: Int, $before: Cursor, $after: Cursor, $offset: Int, $orderBy: [OrdersOrderBy!], $status: OrderStatus!, $userId: UUID!) {
  ordersCollection(
    first: $first
    last: $last
    before: $before
    after: $after
    offset: $offset
    orderBy: $orderBy
    filter: {orderStatus: {eq: $status}, userId: {eq: $userId}}
  ) {
    edges {
      node {
        ...Order
      }
    }
  }
}
    ${OrderFragmentDoc}`;

/**
 * __useOrdersByStatusAndUserQuery__
 *
 * To run a query within a React component, call `useOrdersByStatusAndUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersByStatusAndUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersByStatusAndUserQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      status: // value for 'status'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useOrdersByStatusAndUserQuery(baseOptions: Apollo.QueryHookOptions<OrdersByStatusAndUserQuery, OrdersByStatusAndUserQueryVariables> & ({ variables: OrdersByStatusAndUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersByStatusAndUserQuery, OrdersByStatusAndUserQueryVariables>(OrdersByStatusAndUserDocument, options);
      }
export function useOrdersByStatusAndUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersByStatusAndUserQuery, OrdersByStatusAndUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersByStatusAndUserQuery, OrdersByStatusAndUserQueryVariables>(OrdersByStatusAndUserDocument, options);
        }
export function useOrdersByStatusAndUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrdersByStatusAndUserQuery, OrdersByStatusAndUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrdersByStatusAndUserQuery, OrdersByStatusAndUserQueryVariables>(OrdersByStatusAndUserDocument, options);
        }
export type OrdersByStatusAndUserQueryHookResult = ReturnType<typeof useOrdersByStatusAndUserQuery>;
export type OrdersByStatusAndUserLazyQueryHookResult = ReturnType<typeof useOrdersByStatusAndUserLazyQuery>;
export type OrdersByStatusAndUserSuspenseQueryHookResult = ReturnType<typeof useOrdersByStatusAndUserSuspenseQuery>;
export type OrdersByStatusAndUserQueryResult = Apollo.QueryResult<OrdersByStatusAndUserQuery, OrdersByStatusAndUserQueryVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: OrdersInsertInput!) {
  insertIntoOrdersCollection(objects: [$input]) {
    records {
      ...Order
    }
  }
}
    ${OrderFragmentDoc}`;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const UpdateOrderDocument = gql`
    mutation UpdateOrder($id: UUID!, $input: OrdersUpdateInput!) {
  updateOrdersCollection(set: $input, filter: {id: {eq: $id}}) {
    records {
      ...Order
    }
  }
}
    ${OrderFragmentDoc}`;
export type UpdateOrderMutationFn = Apollo.MutationFunction<UpdateOrderMutation, UpdateOrderMutationVariables>;

/**
 * __useUpdateOrderMutation__
 *
 * To run a mutation, you first call `useUpdateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderMutation, { data, loading, error }] = useUpdateOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderMutation, UpdateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderMutation, UpdateOrderMutationVariables>(UpdateOrderDocument, options);
      }
export type UpdateOrderMutationHookResult = ReturnType<typeof useUpdateOrderMutation>;
export type UpdateOrderMutationResult = Apollo.MutationResult<UpdateOrderMutation>;
export type UpdateOrderMutationOptions = Apollo.BaseMutationOptions<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const DeleteOrderDocument = gql`
    mutation DeleteOrder($id: UUID!) {
  deleteFromOrdersCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteOrderMutationFn = Apollo.MutationFunction<DeleteOrderMutation, DeleteOrderMutationVariables>;

/**
 * __useDeleteOrderMutation__
 *
 * To run a mutation, you first call `useDeleteOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderMutation, { data, loading, error }] = useDeleteOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOrderMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderMutation, DeleteOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrderMutation, DeleteOrderMutationVariables>(DeleteOrderDocument, options);
      }
export type DeleteOrderMutationHookResult = ReturnType<typeof useDeleteOrderMutation>;
export type DeleteOrderMutationResult = Apollo.MutationResult<DeleteOrderMutation>;
export type DeleteOrderMutationOptions = Apollo.BaseMutationOptions<DeleteOrderMutation, DeleteOrderMutationVariables>;
export const OrderItemsDocument = gql`
    query OrderItems($first: Int, $last: Int, $before: Cursor, $after: Cursor, $offset: Int, $orderBy: [OrderItemsOrderBy!]) {
  orderItemsCollection(
    first: $first
    last: $last
    before: $before
    after: $after
    offset: $offset
    orderBy: $orderBy
  ) {
    edges {
      node {
        ...OrderItem
      }
    }
  }
}
    ${OrderItemFragmentDoc}`;

/**
 * __useOrderItemsQuery__
 *
 * To run a query within a React component, call `useOrderItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderItemsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useOrderItemsQuery(baseOptions?: Apollo.QueryHookOptions<OrderItemsQuery, OrderItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderItemsQuery, OrderItemsQueryVariables>(OrderItemsDocument, options);
      }
export function useOrderItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderItemsQuery, OrderItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderItemsQuery, OrderItemsQueryVariables>(OrderItemsDocument, options);
        }
export function useOrderItemsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderItemsQuery, OrderItemsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderItemsQuery, OrderItemsQueryVariables>(OrderItemsDocument, options);
        }
export type OrderItemsQueryHookResult = ReturnType<typeof useOrderItemsQuery>;
export type OrderItemsLazyQueryHookResult = ReturnType<typeof useOrderItemsLazyQuery>;
export type OrderItemsSuspenseQueryHookResult = ReturnType<typeof useOrderItemsSuspenseQuery>;
export type OrderItemsQueryResult = Apollo.QueryResult<OrderItemsQuery, OrderItemsQueryVariables>;
export const OrderItemsByOrderDocument = gql`
    query OrderItemsByOrder($first: Int, $last: Int, $before: Cursor, $after: Cursor, $offset: Int, $orderBy: [OrderItemsOrderBy!], $orderId: UUID!) {
  orderItemsCollection(
    first: $first
    last: $last
    before: $before
    after: $after
    offset: $offset
    orderBy: $orderBy
    filter: {orderId: {eq: $orderId}}
  ) {
    edges {
      node {
        ...OrderItem
      }
    }
  }
}
    ${OrderItemFragmentDoc}`;

/**
 * __useOrderItemsByOrderQuery__
 *
 * To run a query within a React component, call `useOrderItemsByOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderItemsByOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderItemsByOrderQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useOrderItemsByOrderQuery(baseOptions: Apollo.QueryHookOptions<OrderItemsByOrderQuery, OrderItemsByOrderQueryVariables> & ({ variables: OrderItemsByOrderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderItemsByOrderQuery, OrderItemsByOrderQueryVariables>(OrderItemsByOrderDocument, options);
      }
export function useOrderItemsByOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderItemsByOrderQuery, OrderItemsByOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderItemsByOrderQuery, OrderItemsByOrderQueryVariables>(OrderItemsByOrderDocument, options);
        }
export function useOrderItemsByOrderSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<OrderItemsByOrderQuery, OrderItemsByOrderQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<OrderItemsByOrderQuery, OrderItemsByOrderQueryVariables>(OrderItemsByOrderDocument, options);
        }
export type OrderItemsByOrderQueryHookResult = ReturnType<typeof useOrderItemsByOrderQuery>;
export type OrderItemsByOrderLazyQueryHookResult = ReturnType<typeof useOrderItemsByOrderLazyQuery>;
export type OrderItemsByOrderSuspenseQueryHookResult = ReturnType<typeof useOrderItemsByOrderSuspenseQuery>;
export type OrderItemsByOrderQueryResult = Apollo.QueryResult<OrderItemsByOrderQuery, OrderItemsByOrderQueryVariables>;
export const CreateOrderItemDocument = gql`
    mutation CreateOrderItem($input: OrderItemsInsertInput!) {
  insertIntoOrderItemsCollection(objects: [$input]) {
    records {
      ...OrderItem
    }
  }
}
    ${OrderItemFragmentDoc}`;
export type CreateOrderItemMutationFn = Apollo.MutationFunction<CreateOrderItemMutation, CreateOrderItemMutationVariables>;

/**
 * __useCreateOrderItemMutation__
 *
 * To run a mutation, you first call `useCreateOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderItemMutation, { data, loading, error }] = useCreateOrderItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderItemMutation, CreateOrderItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderItemMutation, CreateOrderItemMutationVariables>(CreateOrderItemDocument, options);
      }
export type CreateOrderItemMutationHookResult = ReturnType<typeof useCreateOrderItemMutation>;
export type CreateOrderItemMutationResult = Apollo.MutationResult<CreateOrderItemMutation>;
export type CreateOrderItemMutationOptions = Apollo.BaseMutationOptions<CreateOrderItemMutation, CreateOrderItemMutationVariables>;
export const UpdateOrderItemDocument = gql`
    mutation UpdateOrderItem($id: UUID!, $input: OrderItemsUpdateInput!) {
  updateOrderItemsCollection(set: $input, filter: {id: {eq: $id}}) {
    records {
      ...OrderItem
    }
  }
}
    ${OrderItemFragmentDoc}`;
export type UpdateOrderItemMutationFn = Apollo.MutationFunction<UpdateOrderItemMutation, UpdateOrderItemMutationVariables>;

/**
 * __useUpdateOrderItemMutation__
 *
 * To run a mutation, you first call `useUpdateOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderItemMutation, { data, loading, error }] = useUpdateOrderItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderItemMutation, UpdateOrderItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderItemMutation, UpdateOrderItemMutationVariables>(UpdateOrderItemDocument, options);
      }
export type UpdateOrderItemMutationHookResult = ReturnType<typeof useUpdateOrderItemMutation>;
export type UpdateOrderItemMutationResult = Apollo.MutationResult<UpdateOrderItemMutation>;
export type UpdateOrderItemMutationOptions = Apollo.BaseMutationOptions<UpdateOrderItemMutation, UpdateOrderItemMutationVariables>;
export const DeleteOrderItemDocument = gql`
    mutation DeleteOrderItem($id: UUID!) {
  deleteFromOrderItemsCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteOrderItemMutationFn = Apollo.MutationFunction<DeleteOrderItemMutation, DeleteOrderItemMutationVariables>;

/**
 * __useDeleteOrderItemMutation__
 *
 * To run a mutation, you first call `useDeleteOrderItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOrderItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOrderItemMutation, { data, loading, error }] = useDeleteOrderItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteOrderItemMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOrderItemMutation, DeleteOrderItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteOrderItemMutation, DeleteOrderItemMutationVariables>(DeleteOrderItemDocument, options);
      }
export type DeleteOrderItemMutationHookResult = ReturnType<typeof useDeleteOrderItemMutation>;
export type DeleteOrderItemMutationResult = Apollo.MutationResult<DeleteOrderItemMutation>;
export type DeleteOrderItemMutationOptions = Apollo.BaseMutationOptions<DeleteOrderItemMutation, DeleteOrderItemMutationVariables>;
export const ProductsDocument = gql`
    query Products($first: Int, $last: Int, $before: Cursor, $after: Cursor, $offset: Int, $orderBy: [ProductsOrderBy!]) {
  productsCollection(
    first: $first
    last: $last
    before: $before
    after: $after
    offset: $offset
    orderBy: $orderBy
  ) {
    edges {
      node {
        ...Product
      }
    }
  }
}
    ${ProductFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export function useProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsSuspenseQueryHookResult = ReturnType<typeof useProductsSuspenseQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const ProductDocument = gql`
    query Product($id: UUID!) {
  productsCollection(first: 1, filter: {id: {eq: $id}}) {
    edges {
      node {
        ...Product
      }
    }
  }
}
    ${ProductFragmentDoc}`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables> & ({ variables: ProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export function useProductSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductSuspenseQueryHookResult = ReturnType<typeof useProductSuspenseQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($input: ProductsInsertInput!) {
  insertIntoProductsCollection(objects: [$input]) {
    records {
      ...Product
    }
  }
}
    ${ProductFragmentDoc}`;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($id: UUID!, $input: ProductsUpdateInput!) {
  updateProductsCollection(set: $input, filter: {id: {eq: $id}}) {
    records {
      ...Product
    }
  }
}
    ${ProductFragmentDoc}`;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($id: UUID!) {
  deleteFromProductsCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const ProductTypesDocument = gql`
    query ProductTypes($first: Int, $last: Int, $before: Cursor, $after: Cursor, $offset: Int, $orderBy: [ProductTypesOrderBy!]) {
  productTypesCollection(
    first: $first
    last: $last
    before: $before
    after: $after
    offset: $offset
    orderBy: $orderBy
  ) {
    edges {
      node {
        ...ProductType
      }
    }
  }
}
    ${ProductTypeFragmentDoc}`;

/**
 * __useProductTypesQuery__
 *
 * To run a query within a React component, call `useProductTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductTypesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useProductTypesQuery(baseOptions?: Apollo.QueryHookOptions<ProductTypesQuery, ProductTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductTypesQuery, ProductTypesQueryVariables>(ProductTypesDocument, options);
      }
export function useProductTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductTypesQuery, ProductTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductTypesQuery, ProductTypesQueryVariables>(ProductTypesDocument, options);
        }
export function useProductTypesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductTypesQuery, ProductTypesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductTypesQuery, ProductTypesQueryVariables>(ProductTypesDocument, options);
        }
export type ProductTypesQueryHookResult = ReturnType<typeof useProductTypesQuery>;
export type ProductTypesLazyQueryHookResult = ReturnType<typeof useProductTypesLazyQuery>;
export type ProductTypesSuspenseQueryHookResult = ReturnType<typeof useProductTypesSuspenseQuery>;
export type ProductTypesQueryResult = Apollo.QueryResult<ProductTypesQuery, ProductTypesQueryVariables>;
export const ProductTypeDocument = gql`
    query ProductType($id: UUID!) {
  productTypesCollection(first: 1, filter: {id: {eq: $id}}) {
    edges {
      node {
        ...ProductType
      }
    }
  }
}
    ${ProductTypeFragmentDoc}`;

/**
 * __useProductTypeQuery__
 *
 * To run a query within a React component, call `useProductTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductTypeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductTypeQuery(baseOptions: Apollo.QueryHookOptions<ProductTypeQuery, ProductTypeQueryVariables> & ({ variables: ProductTypeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductTypeQuery, ProductTypeQueryVariables>(ProductTypeDocument, options);
      }
export function useProductTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductTypeQuery, ProductTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductTypeQuery, ProductTypeQueryVariables>(ProductTypeDocument, options);
        }
export function useProductTypeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductTypeQuery, ProductTypeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductTypeQuery, ProductTypeQueryVariables>(ProductTypeDocument, options);
        }
export type ProductTypeQueryHookResult = ReturnType<typeof useProductTypeQuery>;
export type ProductTypeLazyQueryHookResult = ReturnType<typeof useProductTypeLazyQuery>;
export type ProductTypeSuspenseQueryHookResult = ReturnType<typeof useProductTypeSuspenseQuery>;
export type ProductTypeQueryResult = Apollo.QueryResult<ProductTypeQuery, ProductTypeQueryVariables>;
export const CreateProductTypeDocument = gql`
    mutation CreateProductType($input: ProductTypesInsertInput!) {
  insertIntoProductTypesCollection(objects: [$input]) {
    records {
      ...ProductType
    }
  }
}
    ${ProductTypeFragmentDoc}`;
export type CreateProductTypeMutationFn = Apollo.MutationFunction<CreateProductTypeMutation, CreateProductTypeMutationVariables>;

/**
 * __useCreateProductTypeMutation__
 *
 * To run a mutation, you first call `useCreateProductTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductTypeMutation, { data, loading, error }] = useCreateProductTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductTypeMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductTypeMutation, CreateProductTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductTypeMutation, CreateProductTypeMutationVariables>(CreateProductTypeDocument, options);
      }
export type CreateProductTypeMutationHookResult = ReturnType<typeof useCreateProductTypeMutation>;
export type CreateProductTypeMutationResult = Apollo.MutationResult<CreateProductTypeMutation>;
export type CreateProductTypeMutationOptions = Apollo.BaseMutationOptions<CreateProductTypeMutation, CreateProductTypeMutationVariables>;
export const UpdateProductTypeDocument = gql`
    mutation UpdateProductType($id: UUID!, $input: ProductTypesUpdateInput!) {
  updateProductTypesCollection(set: $input, filter: {id: {eq: $id}}) {
    records {
      ...ProductType
    }
  }
}
    ${ProductTypeFragmentDoc}`;
export type UpdateProductTypeMutationFn = Apollo.MutationFunction<UpdateProductTypeMutation, UpdateProductTypeMutationVariables>;

/**
 * __useUpdateProductTypeMutation__
 *
 * To run a mutation, you first call `useUpdateProductTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductTypeMutation, { data, loading, error }] = useUpdateProductTypeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProductTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductTypeMutation, UpdateProductTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductTypeMutation, UpdateProductTypeMutationVariables>(UpdateProductTypeDocument, options);
      }
export type UpdateProductTypeMutationHookResult = ReturnType<typeof useUpdateProductTypeMutation>;
export type UpdateProductTypeMutationResult = Apollo.MutationResult<UpdateProductTypeMutation>;
export type UpdateProductTypeMutationOptions = Apollo.BaseMutationOptions<UpdateProductTypeMutation, UpdateProductTypeMutationVariables>;
export const DeleteProductTypeDocument = gql`
    mutation DeleteProductType($id: UUID!) {
  deleteFromProductTypesCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteProductTypeMutationFn = Apollo.MutationFunction<DeleteProductTypeMutation, DeleteProductTypeMutationVariables>;

/**
 * __useDeleteProductTypeMutation__
 *
 * To run a mutation, you first call `useDeleteProductTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductTypeMutation, { data, loading, error }] = useDeleteProductTypeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProductTypeMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductTypeMutation, DeleteProductTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductTypeMutation, DeleteProductTypeMutationVariables>(DeleteProductTypeDocument, options);
      }
export type DeleteProductTypeMutationHookResult = ReturnType<typeof useDeleteProductTypeMutation>;
export type DeleteProductTypeMutationResult = Apollo.MutationResult<DeleteProductTypeMutation>;
export type DeleteProductTypeMutationOptions = Apollo.BaseMutationOptions<DeleteProductTypeMutation, DeleteProductTypeMutationVariables>;
export const StationsDocument = gql`
    query Stations($first: Int, $last: Int, $before: Cursor, $after: Cursor, $offset: Int, $orderBy: [StationsOrderBy!]) {
  stationsCollection(
    first: $first
    last: $last
    before: $before
    after: $after
    offset: $offset
    orderBy: $orderBy
  ) {
    edges {
      node {
        ...Station
      }
    }
  }
}
    ${StationFragmentDoc}`;

/**
 * __useStationsQuery__
 *
 * To run a query within a React component, call `useStationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStationsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      offset: // value for 'offset'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useStationsQuery(baseOptions?: Apollo.QueryHookOptions<StationsQuery, StationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StationsQuery, StationsQueryVariables>(StationsDocument, options);
      }
export function useStationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StationsQuery, StationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StationsQuery, StationsQueryVariables>(StationsDocument, options);
        }
export function useStationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StationsQuery, StationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StationsQuery, StationsQueryVariables>(StationsDocument, options);
        }
export type StationsQueryHookResult = ReturnType<typeof useStationsQuery>;
export type StationsLazyQueryHookResult = ReturnType<typeof useStationsLazyQuery>;
export type StationsSuspenseQueryHookResult = ReturnType<typeof useStationsSuspenseQuery>;
export type StationsQueryResult = Apollo.QueryResult<StationsQuery, StationsQueryVariables>;
export const StationDocument = gql`
    query Station($id: UUID!) {
  stationsCollection(first: 1, filter: {id: {eq: $id}}) {
    edges {
      node {
        ...Station
      }
    }
  }
}
    ${StationFragmentDoc}`;

/**
 * __useStationQuery__
 *
 * To run a query within a React component, call `useStationQuery` and pass it any options that fit your needs.
 * When your component renders, `useStationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStationQuery(baseOptions: Apollo.QueryHookOptions<StationQuery, StationQueryVariables> & ({ variables: StationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StationQuery, StationQueryVariables>(StationDocument, options);
      }
export function useStationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StationQuery, StationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StationQuery, StationQueryVariables>(StationDocument, options);
        }
export function useStationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StationQuery, StationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StationQuery, StationQueryVariables>(StationDocument, options);
        }
export type StationQueryHookResult = ReturnType<typeof useStationQuery>;
export type StationLazyQueryHookResult = ReturnType<typeof useStationLazyQuery>;
export type StationSuspenseQueryHookResult = ReturnType<typeof useStationSuspenseQuery>;
export type StationQueryResult = Apollo.QueryResult<StationQuery, StationQueryVariables>;
export const CreateStationDocument = gql`
    mutation CreateStation($input: StationsInsertInput!) {
  insertIntoStationsCollection(objects: [$input]) {
    records {
      ...Station
    }
  }
}
    ${StationFragmentDoc}`;
export type CreateStationMutationFn = Apollo.MutationFunction<CreateStationMutation, CreateStationMutationVariables>;

/**
 * __useCreateStationMutation__
 *
 * To run a mutation, you first call `useCreateStationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStationMutation, { data, loading, error }] = useCreateStationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStationMutation(baseOptions?: Apollo.MutationHookOptions<CreateStationMutation, CreateStationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStationMutation, CreateStationMutationVariables>(CreateStationDocument, options);
      }
export type CreateStationMutationHookResult = ReturnType<typeof useCreateStationMutation>;
export type CreateStationMutationResult = Apollo.MutationResult<CreateStationMutation>;
export type CreateStationMutationOptions = Apollo.BaseMutationOptions<CreateStationMutation, CreateStationMutationVariables>;
export const UpdateStationDocument = gql`
    mutation UpdateStation($id: UUID!, $input: StationsUpdateInput!) {
  updateStationsCollection(set: $input, filter: {id: {eq: $id}}) {
    records {
      ...Station
    }
  }
}
    ${StationFragmentDoc}`;
export type UpdateStationMutationFn = Apollo.MutationFunction<UpdateStationMutation, UpdateStationMutationVariables>;

/**
 * __useUpdateStationMutation__
 *
 * To run a mutation, you first call `useUpdateStationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStationMutation, { data, loading, error }] = useUpdateStationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateStationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStationMutation, UpdateStationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStationMutation, UpdateStationMutationVariables>(UpdateStationDocument, options);
      }
export type UpdateStationMutationHookResult = ReturnType<typeof useUpdateStationMutation>;
export type UpdateStationMutationResult = Apollo.MutationResult<UpdateStationMutation>;
export type UpdateStationMutationOptions = Apollo.BaseMutationOptions<UpdateStationMutation, UpdateStationMutationVariables>;
export const DeleteStationDocument = gql`
    mutation DeleteStation($id: UUID!) {
  deleteFromStationsCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteStationMutationFn = Apollo.MutationFunction<DeleteStationMutation, DeleteStationMutationVariables>;

/**
 * __useDeleteStationMutation__
 *
 * To run a mutation, you first call `useDeleteStationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStationMutation, { data, loading, error }] = useDeleteStationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStationMutation, DeleteStationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStationMutation, DeleteStationMutationVariables>(DeleteStationDocument, options);
      }
export type DeleteStationMutationHookResult = ReturnType<typeof useDeleteStationMutation>;
export type DeleteStationMutationResult = Apollo.MutationResult<DeleteStationMutation>;
export type DeleteStationMutationOptions = Apollo.BaseMutationOptions<DeleteStationMutation, DeleteStationMutationVariables>;
export const StationsByRegistrationCodeDocument = gql`
    query StationsByRegistrationCode($registrationCode: String!) {
  stationsCollection(filter: {registrationCode: {eq: $registrationCode}}) {
    edges {
      node {
        ...Station
      }
    }
  }
}
    ${StationFragmentDoc}`;

/**
 * __useStationsByRegistrationCodeQuery__
 *
 * To run a query within a React component, call `useStationsByRegistrationCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useStationsByRegistrationCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStationsByRegistrationCodeQuery({
 *   variables: {
 *      registrationCode: // value for 'registrationCode'
 *   },
 * });
 */
export function useStationsByRegistrationCodeQuery(baseOptions: Apollo.QueryHookOptions<StationsByRegistrationCodeQuery, StationsByRegistrationCodeQueryVariables> & ({ variables: StationsByRegistrationCodeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StationsByRegistrationCodeQuery, StationsByRegistrationCodeQueryVariables>(StationsByRegistrationCodeDocument, options);
      }
export function useStationsByRegistrationCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StationsByRegistrationCodeQuery, StationsByRegistrationCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StationsByRegistrationCodeQuery, StationsByRegistrationCodeQueryVariables>(StationsByRegistrationCodeDocument, options);
        }
export function useStationsByRegistrationCodeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StationsByRegistrationCodeQuery, StationsByRegistrationCodeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StationsByRegistrationCodeQuery, StationsByRegistrationCodeQueryVariables>(StationsByRegistrationCodeDocument, options);
        }
export type StationsByRegistrationCodeQueryHookResult = ReturnType<typeof useStationsByRegistrationCodeQuery>;
export type StationsByRegistrationCodeLazyQueryHookResult = ReturnType<typeof useStationsByRegistrationCodeLazyQuery>;
export type StationsByRegistrationCodeSuspenseQueryHookResult = ReturnType<typeof useStationsByRegistrationCodeSuspenseQuery>;
export type StationsByRegistrationCodeQueryResult = Apollo.QueryResult<StationsByRegistrationCodeQuery, StationsByRegistrationCodeQueryVariables>;
export const UserStationsDocument = gql`
    query UserStations($userId: UUID!) {
  userStationsCollection(filter: {userId: {eq: $userId}}) {
    edges {
      node {
        ...UserStation
      }
    }
  }
}
    ${UserStationFragmentDoc}`;

/**
 * __useUserStationsQuery__
 *
 * To run a query within a React component, call `useUserStationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserStationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStationsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserStationsQuery(baseOptions: Apollo.QueryHookOptions<UserStationsQuery, UserStationsQueryVariables> & ({ variables: UserStationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserStationsQuery, UserStationsQueryVariables>(UserStationsDocument, options);
      }
export function useUserStationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserStationsQuery, UserStationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserStationsQuery, UserStationsQueryVariables>(UserStationsDocument, options);
        }
export function useUserStationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserStationsQuery, UserStationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserStationsQuery, UserStationsQueryVariables>(UserStationsDocument, options);
        }
export type UserStationsQueryHookResult = ReturnType<typeof useUserStationsQuery>;
export type UserStationsLazyQueryHookResult = ReturnType<typeof useUserStationsLazyQuery>;
export type UserStationsSuspenseQueryHookResult = ReturnType<typeof useUserStationsSuspenseQuery>;
export type UserStationsQueryResult = Apollo.QueryResult<UserStationsQuery, UserStationsQueryVariables>;
export const UserStationsByStationDocument = gql`
    query UserStationsByStation($stationId: UUID!) {
  userStationsCollection(filter: {stationId: {eq: $stationId}}) {
    edges {
      node {
        ...UserStation
      }
    }
  }
}
    ${UserStationFragmentDoc}`;

/**
 * __useUserStationsByStationQuery__
 *
 * To run a query within a React component, call `useUserStationsByStationQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserStationsByStationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStationsByStationQuery({
 *   variables: {
 *      stationId: // value for 'stationId'
 *   },
 * });
 */
export function useUserStationsByStationQuery(baseOptions: Apollo.QueryHookOptions<UserStationsByStationQuery, UserStationsByStationQueryVariables> & ({ variables: UserStationsByStationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserStationsByStationQuery, UserStationsByStationQueryVariables>(UserStationsByStationDocument, options);
      }
export function useUserStationsByStationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserStationsByStationQuery, UserStationsByStationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserStationsByStationQuery, UserStationsByStationQueryVariables>(UserStationsByStationDocument, options);
        }
export function useUserStationsByStationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserStationsByStationQuery, UserStationsByStationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserStationsByStationQuery, UserStationsByStationQueryVariables>(UserStationsByStationDocument, options);
        }
export type UserStationsByStationQueryHookResult = ReturnType<typeof useUserStationsByStationQuery>;
export type UserStationsByStationLazyQueryHookResult = ReturnType<typeof useUserStationsByStationLazyQuery>;
export type UserStationsByStationSuspenseQueryHookResult = ReturnType<typeof useUserStationsByStationSuspenseQuery>;
export type UserStationsByStationQueryResult = Apollo.QueryResult<UserStationsByStationQuery, UserStationsByStationQueryVariables>;
export const UserStationsByUserDocument = gql`
    query UserStationsByUser($userId: UUID!) {
  userStationsCollection(filter: {userId: {eq: $userId}}) {
    edges {
      node {
        ...UserStation
      }
    }
  }
}
    ${UserStationFragmentDoc}`;

/**
 * __useUserStationsByUserQuery__
 *
 * To run a query within a React component, call `useUserStationsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserStationsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStationsByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserStationsByUserQuery(baseOptions: Apollo.QueryHookOptions<UserStationsByUserQuery, UserStationsByUserQueryVariables> & ({ variables: UserStationsByUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserStationsByUserQuery, UserStationsByUserQueryVariables>(UserStationsByUserDocument, options);
      }
export function useUserStationsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserStationsByUserQuery, UserStationsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserStationsByUserQuery, UserStationsByUserQueryVariables>(UserStationsByUserDocument, options);
        }
export function useUserStationsByUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserStationsByUserQuery, UserStationsByUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserStationsByUserQuery, UserStationsByUserQueryVariables>(UserStationsByUserDocument, options);
        }
export type UserStationsByUserQueryHookResult = ReturnType<typeof useUserStationsByUserQuery>;
export type UserStationsByUserLazyQueryHookResult = ReturnType<typeof useUserStationsByUserLazyQuery>;
export type UserStationsByUserSuspenseQueryHookResult = ReturnType<typeof useUserStationsByUserSuspenseQuery>;
export type UserStationsByUserQueryResult = Apollo.QueryResult<UserStationsByUserQuery, UserStationsByUserQueryVariables>;
export const UsersDocument = gql`
    query Users {
  usersCollection {
    edges {
      node {
        ...User
      }
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const UserDocument = gql`
    query User($id: UUID!) {
  usersCollection(filter: {id: {eq: $id}}) {
    edges {
      node {
        ...User
      }
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const RolesDocument = gql`
    query Roles {
  rolesCollection {
    edges {
      node {
        ...Role
      }
    }
  }
}
    ${RoleFragmentDoc}`;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesQuery(baseOptions?: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
      }
export function useRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export function useRolesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesSuspenseQueryHookResult = ReturnType<typeof useRolesSuspenseQuery>;
export type RolesQueryResult = Apollo.QueryResult<RolesQuery, RolesQueryVariables>;
export const RoleDocument = gql`
    query Role($id: UUID!) {
  rolesCollection(filter: {id: {eq: $id}}) {
    edges {
      node {
        ...Role
      }
    }
  }
}
    ${RoleFragmentDoc}`;

/**
 * __useRoleQuery__
 *
 * To run a query within a React component, call `useRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRoleQuery(baseOptions: Apollo.QueryHookOptions<RoleQuery, RoleQueryVariables> & ({ variables: RoleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoleQuery, RoleQueryVariables>(RoleDocument, options);
      }
export function useRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoleQuery, RoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoleQuery, RoleQueryVariables>(RoleDocument, options);
        }
export function useRoleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RoleQuery, RoleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RoleQuery, RoleQueryVariables>(RoleDocument, options);
        }
export type RoleQueryHookResult = ReturnType<typeof useRoleQuery>;
export type RoleLazyQueryHookResult = ReturnType<typeof useRoleLazyQuery>;
export type RoleSuspenseQueryHookResult = ReturnType<typeof useRoleSuspenseQuery>;
export type RoleQueryResult = Apollo.QueryResult<RoleQuery, RoleQueryVariables>;
export const PermissionsDocument = gql`
    query Permissions {
  permissionsCollection {
    edges {
      node {
        ...Permission
      }
    }
  }
}
    ${PermissionFragmentDoc}`;

/**
 * __usePermissionsQuery__
 *
 * To run a query within a React component, call `usePermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePermissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePermissionsQuery(baseOptions?: Apollo.QueryHookOptions<PermissionsQuery, PermissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PermissionsQuery, PermissionsQueryVariables>(PermissionsDocument, options);
      }
export function usePermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PermissionsQuery, PermissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PermissionsQuery, PermissionsQueryVariables>(PermissionsDocument, options);
        }
export function usePermissionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PermissionsQuery, PermissionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PermissionsQuery, PermissionsQueryVariables>(PermissionsDocument, options);
        }
export type PermissionsQueryHookResult = ReturnType<typeof usePermissionsQuery>;
export type PermissionsLazyQueryHookResult = ReturnType<typeof usePermissionsLazyQuery>;
export type PermissionsSuspenseQueryHookResult = ReturnType<typeof usePermissionsSuspenseQuery>;
export type PermissionsQueryResult = Apollo.QueryResult<PermissionsQuery, PermissionsQueryVariables>;
export const PermissionDocument = gql`
    query Permission($id: UUID!) {
  permissionsCollection(filter: {id: {eq: $id}}) {
    edges {
      node {
        ...Permission
      }
    }
  }
}
    ${PermissionFragmentDoc}`;

/**
 * __usePermissionQuery__
 *
 * To run a query within a React component, call `usePermissionQuery` and pass it any options that fit your needs.
 * When your component renders, `usePermissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePermissionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePermissionQuery(baseOptions: Apollo.QueryHookOptions<PermissionQuery, PermissionQueryVariables> & ({ variables: PermissionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PermissionQuery, PermissionQueryVariables>(PermissionDocument, options);
      }
export function usePermissionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PermissionQuery, PermissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PermissionQuery, PermissionQueryVariables>(PermissionDocument, options);
        }
export function usePermissionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PermissionQuery, PermissionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PermissionQuery, PermissionQueryVariables>(PermissionDocument, options);
        }
export type PermissionQueryHookResult = ReturnType<typeof usePermissionQuery>;
export type PermissionLazyQueryHookResult = ReturnType<typeof usePermissionLazyQuery>;
export type PermissionSuspenseQueryHookResult = ReturnType<typeof usePermissionSuspenseQuery>;
export type PermissionQueryResult = Apollo.QueryResult<PermissionQuery, PermissionQueryVariables>;
export const CreatePermissionDocument = gql`
    mutation CreatePermission($input: PermissionsInsertInput!) {
  insertIntoPermissionsCollection(objects: [$input]) {
    records {
      ...Permission
    }
  }
}
    ${PermissionFragmentDoc}`;
export type CreatePermissionMutationFn = Apollo.MutationFunction<CreatePermissionMutation, CreatePermissionMutationVariables>;

/**
 * __useCreatePermissionMutation__
 *
 * To run a mutation, you first call `useCreatePermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPermissionMutation, { data, loading, error }] = useCreatePermissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePermissionMutation(baseOptions?: Apollo.MutationHookOptions<CreatePermissionMutation, CreatePermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePermissionMutation, CreatePermissionMutationVariables>(CreatePermissionDocument, options);
      }
export type CreatePermissionMutationHookResult = ReturnType<typeof useCreatePermissionMutation>;
export type CreatePermissionMutationResult = Apollo.MutationResult<CreatePermissionMutation>;
export type CreatePermissionMutationOptions = Apollo.BaseMutationOptions<CreatePermissionMutation, CreatePermissionMutationVariables>;
export const UpdatePermissionDocument = gql`
    mutation UpdatePermission($id: UUID!, $input: PermissionsUpdateInput!) {
  updatePermissionsCollection(filter: {id: {eq: $id}}, set: $input) {
    records {
      ...Permission
    }
  }
}
    ${PermissionFragmentDoc}`;
export type UpdatePermissionMutationFn = Apollo.MutationFunction<UpdatePermissionMutation, UpdatePermissionMutationVariables>;

/**
 * __useUpdatePermissionMutation__
 *
 * To run a mutation, you first call `useUpdatePermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePermissionMutation, { data, loading, error }] = useUpdatePermissionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePermissionMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePermissionMutation, UpdatePermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePermissionMutation, UpdatePermissionMutationVariables>(UpdatePermissionDocument, options);
      }
export type UpdatePermissionMutationHookResult = ReturnType<typeof useUpdatePermissionMutation>;
export type UpdatePermissionMutationResult = Apollo.MutationResult<UpdatePermissionMutation>;
export type UpdatePermissionMutationOptions = Apollo.BaseMutationOptions<UpdatePermissionMutation, UpdatePermissionMutationVariables>;
export const DeletePermissionDocument = gql`
    mutation DeletePermission($id: UUID!) {
  deleteFromPermissionsCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeletePermissionMutationFn = Apollo.MutationFunction<DeletePermissionMutation, DeletePermissionMutationVariables>;

/**
 * __useDeletePermissionMutation__
 *
 * To run a mutation, you first call `useDeletePermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePermissionMutation, { data, loading, error }] = useDeletePermissionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePermissionMutation(baseOptions?: Apollo.MutationHookOptions<DeletePermissionMutation, DeletePermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePermissionMutation, DeletePermissionMutationVariables>(DeletePermissionDocument, options);
      }
export type DeletePermissionMutationHookResult = ReturnType<typeof useDeletePermissionMutation>;
export type DeletePermissionMutationResult = Apollo.MutationResult<DeletePermissionMutation>;
export type DeletePermissionMutationOptions = Apollo.BaseMutationOptions<DeletePermissionMutation, DeletePermissionMutationVariables>;
export const CreateRoleDocument = gql`
    mutation CreateRole($input: RolesInsertInput!) {
  insertIntoRolesCollection(objects: [$input]) {
    records {
      ...Role
    }
  }
}
    ${RoleFragmentDoc}`;
export type CreateRoleMutationFn = Apollo.MutationFunction<CreateRoleMutation, CreateRoleMutationVariables>;

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoleMutation, CreateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, options);
      }
export type CreateRoleMutationHookResult = ReturnType<typeof useCreateRoleMutation>;
export type CreateRoleMutationResult = Apollo.MutationResult<CreateRoleMutation>;
export type CreateRoleMutationOptions = Apollo.BaseMutationOptions<CreateRoleMutation, CreateRoleMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation UpdateRole($id: UUID!, $input: RolesUpdateInput!) {
  updateRolesCollection(filter: {id: {eq: $id}}, set: $input) {
    records {
      ...Role
    }
  }
}
    ${RoleFragmentDoc}`;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const DeleteRoleDocument = gql`
    mutation DeleteRole($id: UUID!) {
  deleteFromRolesCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteRoleMutationFn = Apollo.MutationFunction<DeleteRoleMutation, DeleteRoleMutationVariables>;

/**
 * __useDeleteRoleMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoleMutation, { data, loading, error }] = useDeleteRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoleMutation, DeleteRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(DeleteRoleDocument, options);
      }
export type DeleteRoleMutationHookResult = ReturnType<typeof useDeleteRoleMutation>;
export type DeleteRoleMutationResult = Apollo.MutationResult<DeleteRoleMutation>;
export type DeleteRoleMutationOptions = Apollo.BaseMutationOptions<DeleteRoleMutation, DeleteRoleMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: UsersInsertInput!) {
  insertIntoUsersCollection(objects: [$input]) {
    records {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: UUID!, $input: UsersUpdateInput!) {
  updateUsersCollection(filter: {id: {eq: $id}}, set: $input) {
    records {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: UUID!) {
  deleteFromUsersCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const CreateUserRoleDocument = gql`
    mutation CreateUserRole($input: UserRolesInsertInput!) {
  insertIntoUserRolesCollection(objects: [$input]) {
    records {
      ...UserRole
    }
  }
}
    ${UserRoleFragmentDoc}`;
export type CreateUserRoleMutationFn = Apollo.MutationFunction<CreateUserRoleMutation, CreateUserRoleMutationVariables>;

/**
 * __useCreateUserRoleMutation__
 *
 * To run a mutation, you first call `useCreateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserRoleMutation, { data, loading, error }] = useCreateUserRoleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserRoleMutation, CreateUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserRoleMutation, CreateUserRoleMutationVariables>(CreateUserRoleDocument, options);
      }
export type CreateUserRoleMutationHookResult = ReturnType<typeof useCreateUserRoleMutation>;
export type CreateUserRoleMutationResult = Apollo.MutationResult<CreateUserRoleMutation>;
export type CreateUserRoleMutationOptions = Apollo.BaseMutationOptions<CreateUserRoleMutation, CreateUserRoleMutationVariables>;
export const UpdateUserRoleDocument = gql`
    mutation UpdateUserRole($id: UUID!, $input: UserRolesUpdateInput!) {
  updateUserRolesCollection(filter: {id: {eq: $id}}, set: $input) {
    records {
      ...UserRole
    }
  }
}
    ${UserRoleFragmentDoc}`;
export type UpdateUserRoleMutationFn = Apollo.MutationFunction<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;

/**
 * __useUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRoleMutation, { data, loading, error }] = useUpdateUserRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(UpdateUserRoleDocument, options);
      }
export type UpdateUserRoleMutationHookResult = ReturnType<typeof useUpdateUserRoleMutation>;
export type UpdateUserRoleMutationResult = Apollo.MutationResult<UpdateUserRoleMutation>;
export type UpdateUserRoleMutationOptions = Apollo.BaseMutationOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>;
export const DeleteUserRoleDocument = gql`
    mutation DeleteUserRole($id: UUID!) {
  deleteFromUserRolesCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteUserRoleMutationFn = Apollo.MutationFunction<DeleteUserRoleMutation, DeleteUserRoleMutationVariables>;

/**
 * __useDeleteUserRoleMutation__
 *
 * To run a mutation, you first call `useDeleteUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserRoleMutation, { data, loading, error }] = useDeleteUserRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserRoleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserRoleMutation, DeleteUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserRoleMutation, DeleteUserRoleMutationVariables>(DeleteUserRoleDocument, options);
      }
export type DeleteUserRoleMutationHookResult = ReturnType<typeof useDeleteUserRoleMutation>;
export type DeleteUserRoleMutationResult = Apollo.MutationResult<DeleteUserRoleMutation>;
export type DeleteUserRoleMutationOptions = Apollo.BaseMutationOptions<DeleteUserRoleMutation, DeleteUserRoleMutationVariables>;
export const UserPermissionsDocument = gql`
    query UserPermissions {
  userPermissionsCollection {
    edges {
      node {
        ...UserPermission
      }
    }
  }
}
    ${UserPermissionFragmentDoc}`;

/**
 * __useUserPermissionsQuery__
 *
 * To run a query within a React component, call `useUserPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPermissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserPermissionsQuery(baseOptions?: Apollo.QueryHookOptions<UserPermissionsQuery, UserPermissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserPermissionsQuery, UserPermissionsQueryVariables>(UserPermissionsDocument, options);
      }
export function useUserPermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPermissionsQuery, UserPermissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserPermissionsQuery, UserPermissionsQueryVariables>(UserPermissionsDocument, options);
        }
export function useUserPermissionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserPermissionsQuery, UserPermissionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserPermissionsQuery, UserPermissionsQueryVariables>(UserPermissionsDocument, options);
        }
export type UserPermissionsQueryHookResult = ReturnType<typeof useUserPermissionsQuery>;
export type UserPermissionsLazyQueryHookResult = ReturnType<typeof useUserPermissionsLazyQuery>;
export type UserPermissionsSuspenseQueryHookResult = ReturnType<typeof useUserPermissionsSuspenseQuery>;
export type UserPermissionsQueryResult = Apollo.QueryResult<UserPermissionsQuery, UserPermissionsQueryVariables>;
export const UserPermissionDocument = gql`
    query UserPermission($id: UUID!) {
  userPermissionsCollection(filter: {id: {eq: $id}}) {
    edges {
      node {
        ...UserPermission
      }
    }
  }
}
    ${UserPermissionFragmentDoc}`;

/**
 * __useUserPermissionQuery__
 *
 * To run a query within a React component, call `useUserPermissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserPermissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserPermissionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserPermissionQuery(baseOptions: Apollo.QueryHookOptions<UserPermissionQuery, UserPermissionQueryVariables> & ({ variables: UserPermissionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserPermissionQuery, UserPermissionQueryVariables>(UserPermissionDocument, options);
      }
export function useUserPermissionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserPermissionQuery, UserPermissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserPermissionQuery, UserPermissionQueryVariables>(UserPermissionDocument, options);
        }
export function useUserPermissionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserPermissionQuery, UserPermissionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserPermissionQuery, UserPermissionQueryVariables>(UserPermissionDocument, options);
        }
export type UserPermissionQueryHookResult = ReturnType<typeof useUserPermissionQuery>;
export type UserPermissionLazyQueryHookResult = ReturnType<typeof useUserPermissionLazyQuery>;
export type UserPermissionSuspenseQueryHookResult = ReturnType<typeof useUserPermissionSuspenseQuery>;
export type UserPermissionQueryResult = Apollo.QueryResult<UserPermissionQuery, UserPermissionQueryVariables>;
export const CreateUserPermissionDocument = gql`
    mutation CreateUserPermission($input: UserPermissionsInsertInput!) {
  insertIntoUserPermissionsCollection(objects: [$input]) {
    records {
      ...UserPermission
    }
  }
}
    ${UserPermissionFragmentDoc}`;
export type CreateUserPermissionMutationFn = Apollo.MutationFunction<CreateUserPermissionMutation, CreateUserPermissionMutationVariables>;

/**
 * __useCreateUserPermissionMutation__
 *
 * To run a mutation, you first call `useCreateUserPermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserPermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserPermissionMutation, { data, loading, error }] = useCreateUserPermissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserPermissionMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserPermissionMutation, CreateUserPermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserPermissionMutation, CreateUserPermissionMutationVariables>(CreateUserPermissionDocument, options);
      }
export type CreateUserPermissionMutationHookResult = ReturnType<typeof useCreateUserPermissionMutation>;
export type CreateUserPermissionMutationResult = Apollo.MutationResult<CreateUserPermissionMutation>;
export type CreateUserPermissionMutationOptions = Apollo.BaseMutationOptions<CreateUserPermissionMutation, CreateUserPermissionMutationVariables>;
export const UpdateUserPermissionDocument = gql`
    mutation UpdateUserPermission($id: UUID!, $input: UserPermissionsUpdateInput!) {
  updateUserPermissionsCollection(filter: {id: {eq: $id}}, set: $input) {
    records {
      ...UserPermission
    }
  }
}
    ${UserPermissionFragmentDoc}`;
export type UpdateUserPermissionMutationFn = Apollo.MutationFunction<UpdateUserPermissionMutation, UpdateUserPermissionMutationVariables>;

/**
 * __useUpdateUserPermissionMutation__
 *
 * To run a mutation, you first call `useUpdateUserPermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPermissionMutation, { data, loading, error }] = useUpdateUserPermissionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserPermissionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPermissionMutation, UpdateUserPermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPermissionMutation, UpdateUserPermissionMutationVariables>(UpdateUserPermissionDocument, options);
      }
export type UpdateUserPermissionMutationHookResult = ReturnType<typeof useUpdateUserPermissionMutation>;
export type UpdateUserPermissionMutationResult = Apollo.MutationResult<UpdateUserPermissionMutation>;
export type UpdateUserPermissionMutationOptions = Apollo.BaseMutationOptions<UpdateUserPermissionMutation, UpdateUserPermissionMutationVariables>;
export const DeleteUserPermissionDocument = gql`
    mutation DeleteUserPermission($id: UUID!) {
  deleteFromUserPermissionsCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteUserPermissionMutationFn = Apollo.MutationFunction<DeleteUserPermissionMutation, DeleteUserPermissionMutationVariables>;

/**
 * __useDeleteUserPermissionMutation__
 *
 * To run a mutation, you first call `useDeleteUserPermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserPermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserPermissionMutation, { data, loading, error }] = useDeleteUserPermissionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserPermissionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserPermissionMutation, DeleteUserPermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserPermissionMutation, DeleteUserPermissionMutationVariables>(DeleteUserPermissionDocument, options);
      }
export type DeleteUserPermissionMutationHookResult = ReturnType<typeof useDeleteUserPermissionMutation>;
export type DeleteUserPermissionMutationResult = Apollo.MutationResult<DeleteUserPermissionMutation>;
export type DeleteUserPermissionMutationOptions = Apollo.BaseMutationOptions<DeleteUserPermissionMutation, DeleteUserPermissionMutationVariables>;
export const RolePermissionsDocument = gql`
    query RolePermissions {
  rolePermissionsCollection {
    edges {
      node {
        ...RolePermission
      }
    }
  }
}
    ${RolePermissionFragmentDoc}`;

/**
 * __useRolePermissionsQuery__
 *
 * To run a query within a React component, call `useRolePermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolePermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolePermissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolePermissionsQuery(baseOptions?: Apollo.QueryHookOptions<RolePermissionsQuery, RolePermissionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolePermissionsQuery, RolePermissionsQueryVariables>(RolePermissionsDocument, options);
      }
export function useRolePermissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolePermissionsQuery, RolePermissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolePermissionsQuery, RolePermissionsQueryVariables>(RolePermissionsDocument, options);
        }
export function useRolePermissionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RolePermissionsQuery, RolePermissionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RolePermissionsQuery, RolePermissionsQueryVariables>(RolePermissionsDocument, options);
        }
export type RolePermissionsQueryHookResult = ReturnType<typeof useRolePermissionsQuery>;
export type RolePermissionsLazyQueryHookResult = ReturnType<typeof useRolePermissionsLazyQuery>;
export type RolePermissionsSuspenseQueryHookResult = ReturnType<typeof useRolePermissionsSuspenseQuery>;
export type RolePermissionsQueryResult = Apollo.QueryResult<RolePermissionsQuery, RolePermissionsQueryVariables>;
export const RolePermissionDocument = gql`
    query RolePermission($id: UUID!) {
  rolePermissionsCollection(filter: {id: {eq: $id}}) {
    edges {
      node {
        ...RolePermission
      }
    }
  }
}
    ${RolePermissionFragmentDoc}`;

/**
 * __useRolePermissionQuery__
 *
 * To run a query within a React component, call `useRolePermissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolePermissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolePermissionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRolePermissionQuery(baseOptions: Apollo.QueryHookOptions<RolePermissionQuery, RolePermissionQueryVariables> & ({ variables: RolePermissionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolePermissionQuery, RolePermissionQueryVariables>(RolePermissionDocument, options);
      }
export function useRolePermissionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolePermissionQuery, RolePermissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolePermissionQuery, RolePermissionQueryVariables>(RolePermissionDocument, options);
        }
export function useRolePermissionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RolePermissionQuery, RolePermissionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RolePermissionQuery, RolePermissionQueryVariables>(RolePermissionDocument, options);
        }
export type RolePermissionQueryHookResult = ReturnType<typeof useRolePermissionQuery>;
export type RolePermissionLazyQueryHookResult = ReturnType<typeof useRolePermissionLazyQuery>;
export type RolePermissionSuspenseQueryHookResult = ReturnType<typeof useRolePermissionSuspenseQuery>;
export type RolePermissionQueryResult = Apollo.QueryResult<RolePermissionQuery, RolePermissionQueryVariables>;
export const CreateRolePermissionDocument = gql`
    mutation CreateRolePermission($input: RolePermissionsInsertInput!) {
  insertIntoRolePermissionsCollection(objects: [$input]) {
    records {
      ...RolePermission
    }
  }
}
    ${RolePermissionFragmentDoc}`;
export type CreateRolePermissionMutationFn = Apollo.MutationFunction<CreateRolePermissionMutation, CreateRolePermissionMutationVariables>;

/**
 * __useCreateRolePermissionMutation__
 *
 * To run a mutation, you first call `useCreateRolePermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRolePermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRolePermissionMutation, { data, loading, error }] = useCreateRolePermissionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRolePermissionMutation(baseOptions?: Apollo.MutationHookOptions<CreateRolePermissionMutation, CreateRolePermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRolePermissionMutation, CreateRolePermissionMutationVariables>(CreateRolePermissionDocument, options);
      }
export type CreateRolePermissionMutationHookResult = ReturnType<typeof useCreateRolePermissionMutation>;
export type CreateRolePermissionMutationResult = Apollo.MutationResult<CreateRolePermissionMutation>;
export type CreateRolePermissionMutationOptions = Apollo.BaseMutationOptions<CreateRolePermissionMutation, CreateRolePermissionMutationVariables>;
export const UpdateRolePermissionDocument = gql`
    mutation UpdateRolePermission($id: UUID!, $input: RolePermissionsUpdateInput!) {
  updateRolePermissionsCollection(filter: {id: {eq: $id}}, set: $input) {
    records {
      ...RolePermission
    }
  }
}
    ${RolePermissionFragmentDoc}`;
export type UpdateRolePermissionMutationFn = Apollo.MutationFunction<UpdateRolePermissionMutation, UpdateRolePermissionMutationVariables>;

/**
 * __useUpdateRolePermissionMutation__
 *
 * To run a mutation, you first call `useUpdateRolePermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRolePermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRolePermissionMutation, { data, loading, error }] = useUpdateRolePermissionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRolePermissionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRolePermissionMutation, UpdateRolePermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRolePermissionMutation, UpdateRolePermissionMutationVariables>(UpdateRolePermissionDocument, options);
      }
export type UpdateRolePermissionMutationHookResult = ReturnType<typeof useUpdateRolePermissionMutation>;
export type UpdateRolePermissionMutationResult = Apollo.MutationResult<UpdateRolePermissionMutation>;
export type UpdateRolePermissionMutationOptions = Apollo.BaseMutationOptions<UpdateRolePermissionMutation, UpdateRolePermissionMutationVariables>;
export const DeleteRolePermissionDocument = gql`
    mutation DeleteRolePermission($id: UUID!) {
  deleteFromRolePermissionsCollection(filter: {id: {eq: $id}}) {
    affectedCount
  }
}
    `;
export type DeleteRolePermissionMutationFn = Apollo.MutationFunction<DeleteRolePermissionMutation, DeleteRolePermissionMutationVariables>;

/**
 * __useDeleteRolePermissionMutation__
 *
 * To run a mutation, you first call `useDeleteRolePermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRolePermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRolePermissionMutation, { data, loading, error }] = useDeleteRolePermissionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRolePermissionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRolePermissionMutation, DeleteRolePermissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRolePermissionMutation, DeleteRolePermissionMutationVariables>(DeleteRolePermissionDocument, options);
      }
export type DeleteRolePermissionMutationHookResult = ReturnType<typeof useDeleteRolePermissionMutation>;
export type DeleteRolePermissionMutationResult = Apollo.MutationResult<DeleteRolePermissionMutation>;
export type DeleteRolePermissionMutationOptions = Apollo.BaseMutationOptions<DeleteRolePermissionMutation, DeleteRolePermissionMutationVariables>;