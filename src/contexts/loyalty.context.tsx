import React, { createContext, useContext, useMemo, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_BALANCE_UPOINT, GET_ORDERS } from '../graphql/query';
import { IUpointBalance } from '../types';
import { ADD_ORDER_LOYALTY } from '../graphql/mutation/loyalty';

interface UpointBalanceState {
  phone: string;
  balance: number;
  payment: string;
  state: 'spend' | 'collect' | 'balance';
  code: string;
}

interface ActionType {
  variables?: any;
  onCompleted?: (data: any) => void;
  onError?: (error: Error) => void;
  options?: any;
  update?: () => void;
}

type LoyaltyContextType = {
  upointBalance: UpointBalanceState;
  setUpointBalance: (e: UpointBalanceState) => void;
  upointLoadingBalance: boolean;
  getUpointBalance: (input: any) => Promise<void>;
  upointStep: number;
  setUpointStep: (e: number) => void;
  clearUpointState: () => void;
  addOrderLoyalty: (input: any) => Promise<void>;
  addingLoyalty: boolean;
};

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const useLoyaltyContext = () => {
  return useContext(LoyaltyContext);
};

export const LoyaltyProvider = ({ children }: any) => {
  const [upointBalance, setUpointBalance] = useState<UpointBalanceState>(null);
  const [upointStep, setUpointStep] = useState<number>(0);

  const [getBalanceUpoint, { loading: upointLoadingBalance }] = useLazyQuery<{
    getBalanceUpoint: IUpointBalance;
  }>(GET_BALANCE_UPOINT);
  const getUpointBalance = async ({ variables, onCompleted, onError, options }: ActionType) => {
    await getBalanceUpoint({
      fetchPolicy: 'network-only',
      variables,
      onCompleted:
        onCompleted ||
        ((data) => {
          setUpointBalance({
            phone: data.getBalanceUpoint.phone,
            balance: +data.getBalanceUpoint.balance,
            payment: '',
            state: 'balance',
            code: data.getBalanceUpoint.code,
          });
          setUpointStep((prevStep) => prevStep + 1);
        }),
      onError: onError || ((error) => console.log('Error getBalance', error.message)),
      ...options,
    });
    return Promise.resolve();
  };

  const clearUpointState = () => {
    setUpointStep(0);
    setUpointBalance(null);
  };

  const [addLoyalty, { loading: addingLoyalty }] = useMutation(ADD_ORDER_LOYALTY);
  const addOrderLoyalty = async ({ variables, onError, update, options }: ActionType) => {
    await addLoyalty({
      variables,
      update:
        update ||
        ((cache, { data: { addOrderLoyalty } }) => {
          const caches = cache.readQuery<{ getOrders: any[] }>({ query: GET_ORDERS });
          if (caches?.getOrders) {
            cache.writeQuery({
              query: GET_ORDERS,
              data: {
                getOrders: caches.getOrders.map((item) => (item.id === addOrderLoyalty.id ? addOrderLoyalty : item)),
              },
            });
          }
        }),
      onError: onError || ((error) => console.log('Error addOrderLoyalty', error.message)),
      ...options,
    });
    return Promise.resolve();
  };

  const contextValue = useMemo(
    () => ({
      upointBalance,
      setUpointBalance,
      upointLoadingBalance,
      getUpointBalance,
      upointStep,
      setUpointStep,
      clearUpointState,
      addOrderLoyalty,
      addingLoyalty,
    }),
    [upointBalance, upointLoadingBalance, upointStep, addingLoyalty],
  );

  return <LoyaltyContext.Provider value={contextValue}>{children}</LoyaltyContext.Provider>;
};
