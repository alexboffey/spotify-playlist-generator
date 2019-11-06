import React, { useState } from "react";
import { Query } from "react-apollo";
import { Avatar, message, List } from "antd";
import { reverse } from "lodash";

import Header from "./Header";
import TermSwitcher from "./TermSwitcher";
import {
  IMyTopTracksQuery,
  MY_TOP_TRACKS_QUERY
} from "../graphql/myTopTracksQuery";
import { HistoricalTerms } from "../types";

const TopTracks: React.FunctionComponent = () => {
  const [timeRange, setTimeRange] = useState<HistoricalTerms>("short_term");

  return (
    <Query<IMyTopTracksQuery>
      query={MY_TOP_TRACKS_QUERY}
      variables={{ limit: 20, time_range: timeRange }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error, refetch }) => {
        if (error) message.error(error);

        return (
          <React.Fragment>
            <Header title="Top Tracks" />

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
                data.myTopTracks.items.map(({ name, id, album, artists }) => (
                  <List.Item key={id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          shape="square"
                          size="large"
                          src={
                            album.images.length > 0
                              ? reverse(album.images)[0].url
                              : ""
                          }
                        >
                          {name.split("")[0]}
                        </Avatar>
                      }
                      title={name}
                      description={artists.map(({ name }) => name).join(", ")}
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

export default TopTracks;
