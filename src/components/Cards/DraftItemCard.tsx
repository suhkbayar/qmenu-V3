import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineEdit } from 'react-icons/ai';
import { CURRENCY } from '../../constants/currency';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { useCallStore } from '../../contexts/call.store';
import { CommentModal } from '..';
import { isEmpty } from 'lodash';
import { Translate } from 'react-auto-translate';

type Props = {
  item: any;
  image: string;
};

const Index = ({ item, image }: Props) => {
  const { t } = useTranslation('language');
  const [visible, setVisible] = useState(false);

  const { addOrderItem, remove, addOrderItemComment } = useCallStore();

  const addComment = (comment: string) => {
    addOrderItemComment(item, comment);
  };

  const showAddComment = () => {
    setVisible(true);
  };

  return (
    <>
      <div className="bg-white flex mb-4 rounded-xl w-full place-content-between drop-shadow-lg  dark:bg-gray-700 ">
        <div className="flex">
          <div className="w-40 place-self-center ">
            <img alt="A scenic landscape" className="w-40 rounded-lg h-full" src={image} />
          </div>
          <div className="w-38 ml-2 grid p-1 place-content-between">
            <span className="text-base  font-medium line-clamp-2 ">
              {!isEmpty(item.name) && <Translate>{item.name}</Translate>}
            </span>

            <div className="flex items-center cursor-pointer" onClick={() => showAddComment()}>
              <AiOutlineEdit className="text-gray1 mr-2" />
              <span className="text-sm text-gray1 line-clamp-1">
                {isEmpty(item.comment) ? <>{t('mainPage.additionalRequests')}</> : item.comment}
              </span>
            </div>
            <span className="text-base font-medium text-current ">
              {item.price.toLocaleString()} {CURRENCY}
            </span>
          </div>
        </div>

        <div className="w-12 place-self-center">
          <div className="grid  items-center place-content-center py-1">
            <CiSquarePlus onClick={() => addOrderItem(item)} className="cursor-pointer text-current w-9 h-9" />
            <p className="mx-2 text-current animate-quantity-change  text-center">{item.quantity}</p>
            <CiSquareMinus onClick={() => remove(item)} className="cursor-pointer text-current w-9 h-9" />
          </div>
        </div>
      </div>

      {visible && (
        <CommentModal
          comment={item.comment}
          visible={visible}
          onClose={() => setVisible(false)}
          addComment={addComment}
        />
      )}
    </>
  );
};

export default Index;
