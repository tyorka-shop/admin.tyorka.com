import { useMutation } from "@apollo/client";
import * as mutattion from "./mutation.gql";
import { PublishMutation } from "./mutation.types";

export const usePublish = () => {
  const [publish, { loading }] = useMutation<PublishMutation>(mutattion, {
    refetchQueries: ["Publications"],
  });

  return {
    publish: () => publish(),
    loading,
  };
};
