import React, { useState } from "react";
import { Query } from "react-apollo";
import { Avatar, message, List, Form, Select } from "antd";

import Header from "./Header";
import {
  IMyTopTracksQuery,
  MY_TOP_TRACKS_QUERY
} from "../graphql/myTopTracksQuery";

const TopTracks: React.FunctionComponent = () => {
  const initialTimeRange = "short_term";
  const [timeRange, setTimeRange] = useState<string>(initialTimeRange);

  return (
    <Query<IMyTopTracksQuery>
      query={MY_TOP_TRACKS_QUERY}
      variables={{ limit: 20, time_range: timeRange }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error, refetch }) => {
        if (error) return message.error(error);

        return (
          <React.Fragment>
            <Header
              title="My Top Tracks"
              action={() => (
                <Form layout="inline">
                  <Form.Item label="Time Range">
                    <Select
                      defaultValue={initialTimeRange}
                      onChange={(value: string) => {
                        setTimeRange(value);
                        refetch();
                      }}
                    >
                      <Select.Option value="short_term">
                        Short Term
                      </Select.Option>
                      <Select.Option value="medium_term">
                        Medium Term
                      </Select.Option>
                      <Select.Option value="long_term">Long Term</Select.Option>
                    </Select>
                  </Form.Item>
                </Form>
              )}
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
                          src={album.images[0] ? album.images[0].url : ""}
                        >
                          {name.split("")[0]}
                        </Avatar>
                      }
                      title={<span>{name}</span>}
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
