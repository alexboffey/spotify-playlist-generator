import React, { useState } from "react";
import { Query } from "react-apollo";
import { Avatar, message, List, Form, Select } from "antd";
import { startCase } from "lodash";

import Header from "./Header";
import {
  IMyTopArtistsQuery,
  MY_TOP_ARTISTS_QUERY
} from "../graphql/myTopArtistsQuery";

const TopArtists: React.FunctionComponent = () => {
  const initialTimeRange = "short_term";
  const [timeRange, setTimeRange] = useState<string>(initialTimeRange);

  return (
    <Query<IMyTopArtistsQuery>
      query={MY_TOP_ARTISTS_QUERY}
      variables={{ limit: 50, time_range: timeRange }}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error, refetch }) => {
        if (error) return message.error(error);

        return (
          <React.Fragment>
            <Header title="Top Artists" />
            <Form>
              <Form.Item label="Time Range">
                <Select
                  defaultValue={initialTimeRange}
                  onChange={(value: string) => {
                    setTimeRange(value);
                    refetch();
                  }}
                >
                  <Select.Option value="short_term">Short Term</Select.Option>
                  <Select.Option value="medium_term">Medium Term</Select.Option>
                  <Select.Option value="long_term">Long Term</Select.Option>
                </Select>
              </Form.Item>
            </Form>

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
                          src={images[0] ? images[0].url : ""}
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
