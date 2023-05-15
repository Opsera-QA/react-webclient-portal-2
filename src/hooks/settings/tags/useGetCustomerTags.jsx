import {useEffect, useState} from "react";
import useLoadData from "temp-library-components/useLoadData/useLoadData";
import DataParsingHelper from "@opsera/persephone/helpers/data/dataParsing.helper";
import useTagActions from "hooks/settings/tags/useTagActions";
import LiveMessageConstants from "@opsera/definitions/constants/websocket/constants/liveMessage.constants";
import useComponentStateReference from "hooks/useComponentStateReference";
import ObjectHelper from "@opsera/persephone/helpers/object/object.helper";

export default function useGetCustomerTags(handleErrorFunction) {
  const tagActions = useTagActions();
  const [customerTags, setCustomerTags] = useState([]);
  const {
    isLoading,
    error,
    setError,
    loadData,
  } = useLoadData();
  const {websocketClient} = useComponentStateReference();

  useEffect(() => {
    setCustomerTags([]);

    if (loadData) {
      loadData(getCustomerTags, handleErrorFunction).catch(() => {});
    }
  }, []);

  const getCustomerTags = async () => {
    setCustomerTags([]);
    const response = await tagActions.getAllTagsV2(false);
    setCustomerTags(DataParsingHelper.parseArray(response?.data?.data, []));
    // websocketClient.subscribeToTopic(LiveMessageConstants.LIVE_MESSAGE_TOPICS.TAGS);
  };

  return ({
    customerTags: customerTags,
    setCustomerTags: setCustomerTags,
    loadData: () => loadData(getCustomerTags, handleErrorFunction),
    isLoading: isLoading,
    error: error,
    setError: setError,
  });
}
