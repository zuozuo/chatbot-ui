import { IconExternalLink } from '@tabler/icons-react';
import { useContext, useEffect } from 'react';

import { useTranslation } from 'next-i18next';

import { OpenAIModel } from '@/types/openai';

import HomeContext from '@/pages/api/home/home.context';

export const ModelSelect = () => {
  const { t } = useTranslation('chat');

  const {
    state: { selectedConversation, models, defaultModelId },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const handleChange = (key: string, value: string) => {
    selectedConversation &&
      handleUpdateConversation(selectedConversation, { key: key, value: value });
  }

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const model = models.find(
      (m) => m.id === e.target.value,
    ) as OpenAIModel;
    handleChange('model', model);
  };

  return (
    <div className="flex flex-col">
      <select
        className="w-full bg-transparent p-2"
        placeholder={t('Select a model') || ''}
        value={selectedConversation?.model?.id || defaultModelId}
        onChange={handleModelChange}
        >
          {models.map((model) => (
            <option
              key={model.id}
              value={model.id}
              className="dark:bg-[#343541] dark:text-white"
            >
              {model.id === defaultModelId
                ? `Default (${model.name})`
                : model.name}
            </option>
          ))}
      </select>

      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400 mt-3">
        {t('From')}
      </label>
      <div className="w-full rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        <input
          value={selectedConversation?.fromPhone}
          onChange={(e) => handleChange('fromPhone', e.target.value) }
          placeholder={t('Please input the from user phone number for example: +8618510863455')}
          className="w-full p-2 bg-transparent"
        />
      </div>
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400 mt-3">
        {t('To')}
      </label>
      <div className="w-full mb-2 rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        <input
          value={selectedConversation?.toPhone}
          onChange={(e) => handleChange('toPhone', e.target.value) }
          placeholder={t('Please input the to user phone number for example: +12545406665')}
          className="w-full p-2 bg-transparent"
        />
      </div>
    </div>
  );
};
