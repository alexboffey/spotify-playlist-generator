import React, { useState } from "react";
import { Query } from "react-apollo";
import { Avatar, message, List } from "antd";
import { startCase, reverse } from "lodash";

import Header from "./Header";
import {
  IMyTopArtistsQuery,
  MY_TOP_ARTISTS_QUERY
} from "../graphql/myTopArtistsQuery";
import TermSwitcher from "./TermSwitcher";
import { HistoricalTerms } from "../types";

const TopArtists: React.FunctionComponent = () => {
  const [timeRange, setTimeRange] = useState<HistoricalTerms>("short_term");

  return (
    <Query<IMyTopArtistsQuery>
      query={MY_TOP_ARTISTS_QUERY}
      variables={{ limit: 20, time_range: timeRange }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error, refetch }) => {
        if (error) message.error(error);

        return (
          <React.Fragment>
            <Header title="Top Artists" />

            <TermSwitcher
              currentKey={timeRange}
              onClick={({ key }: { key: HistoricalTerms }) => {
                setTimeRange(key);
                refetch();
              }}
            />

            <List loading={loading}>
              {data &&
                !loading &&
                data.myTopArtists.items.map(({ id, name, images, genres }) => (
                  <List.Item key={id}>
                    <List.Item.Meta
                      title={name}
                      description={
                        genres.length > 0
                          ? genres
                              .slice(0, 3)
                              .map(genre => startCase(genre))
                              .join(", ")
                          : "No genres available for this artist"
                      }
                      avatar={
                        <Avatar
                          shape="square"
                          size="large"
                          src={images.length > 0 ? reverse(images)[0].url : ""}
                        >
                          {!images[0] && name.split("")[0]}
                        </Avatar>
                      }
                    />
                  </List.Item>
                ))}
            </List>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default TopArtists;
