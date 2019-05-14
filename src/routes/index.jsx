/**
 * @description
 * @Version Created by stephen on 2019/5/8.
 * @Author stephen
 * @license dongfangdianzi
 */
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

/**
 * 路由配置
 * @constructor
 */
const Routes = () => (
    <BrowserRouter
        forceRefresh={!('pushState' in window.history)}
        keyLength={12}
    >
        <Switch>

            {/* 404 NOT found */}
            <Route component={NoMatch} />

        </Switch>

    </BrowserRouter>
);

export default Routes;
