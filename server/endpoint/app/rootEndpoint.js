import path from 'path';
import UrlPattern from 'url-pattern';
import Endpoint from '../endpoint';
import webAppRouter from '../../webAppRouter';

class RootEndpoint extends Endpoint {
    get(request, response) {
        var status = 404;
        var indexPath = path.join(process.env.ROOT, process.env.WEBAPP_INDEX);

        var pattern = new UrlPattern(request.path);
        
        for (let i = 0; i < webAppRouter.length; i++) {
            if (pattern.match(webAppRouter[i].path) !== null) {
                status = webAppRouter[i].code;
                break;
            }    
        }

        response.status(status).sendFile(indexPath);
    }
}

export default RootEndpoint;