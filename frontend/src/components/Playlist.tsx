import React from "react";
import { Query } from "react-apollo";
import { Spin, message } from "antd";

import {
  MY_TOP_ARTISTS_QUERY,
  IMyTopArtistsQuery
} from "../graphql/myTopArtistsQuery";
import {
  GET_RECOMMENDATIONS_QUERY,
  IGetRecommendationsQuery
} from "../graphql/getRecommendations";
import { Button } from "antd/lib/radio";

const Playlist: React.FunctionComponent = () => {
  return (
    <div>
      <header>
        <h2>This playlist was generated from your top 5 spotify artists</h2>
        <Query<IMyTopArtistsQuery> query={MY_TOP_ARTISTS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <Spin />;
            if (error) return message.error(error);
            if (data) {
              // Format into string for next query
              const seed_artists = data.myTopArtists.items
                .map(item => item.id)
                .join(",");

              return (
                <Query<IGetRecommendationsQuery>
                  query={GET_RECOMMENDATIONS_QUERY}
                  variables={{ seed_artists }}
                >
                  {({ data, loading, error, refetch }) => {
                    if (loading) return <Spin />;
                    if (error) return message.error(error);

                    if (data) {
                      return (
                        <React.Fragment>
                          <Button onClick={() => refetch()}>Regenerate</Button>
                          <pre>
                            <code>{JSON.stringify(data, null, 2)}</code>
                          </pre>
                        </React.Fragment>
                      );
                    }
                  }}
                </Query>
              );
            }
          }}
        </Query>
      </header>
    </div>
  );
};

export default Playlist;
