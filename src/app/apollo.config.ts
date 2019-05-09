import {NgModule} from '@angular/core';
import {HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {getOperationAST} from '../../node_modules/graphql';
import {ApolloLink} from 'apollo-link';
import {WebSocketLink} from 'apollo-link-ws';
import {Graphcool} from './graphcool';

@NgModule({
  exports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})

export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const token = localStorage.getItem('userToken');
    const authorization = token ? `Bearer ${token}` : null;
    const headers = new HttpHeaders();
    headers.append('Authorization', authorization);

    const uri = Graphcool.ApiEndpoint;
    const http = httpLink.create({ uri, headers });

    const ws = new WebSocketLink({
      uri: Graphcool.SubscriptionsEndpoint,
      options: {
        reconnect: true,
        connectionParams: {
          authToken: token
        }
      }
    })

    apollo.create({
      link: ApolloLink.split(
        operation => {
          const operationAST = getOperationAST(operation.query, operation.operationName);
          return !!operationAST && operationAST.operation === 'subscription';
        },
        ws,
        http,
      ),
      cache: new InMemoryCache()
    });

  }
}
