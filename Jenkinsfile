node {
   def commit_id
    try {
      stage('Preparation') {
        checkout scm
        sh "git rev-parse --short HEAD > .git/commit-id"
        commit_id = readFile('.git/commit-id').trim()
        // bitbucketStatusNotify(buildState: 'INPROGRESS')
      }         

      stage('Testing') {
        // A comment just to demo code changes
        def mongo = docker.image('mongo:3.4.10').run() 
        def myTestContainer = docker.image('node:8.9')
        myTestContainer.pull()
        myTestContainer.inside("--link ${mongo.id}:mydb  -e MONGODB_URI=mongodb://mydb:27017/KEYVALUEAPITest -e NODE_ENV=production-test -e PORT=3020") {
              sh 'npm install'
              sh 'npm start & npm test'                    
        }                                   
        mongo.stop()
      }

      stage('Packaging') {            
        //docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
        //  def app = docker.build("<dockerhubusername>/<dockerimage>:${commit_id}", '.').push()
        //}          
        // bitbucketStatusNotify(buildState: 'SUCCESSFUL')
        // slackSend (color: '#00FF00', message: "SUCCESS: Build : '${env.JOB_NAME} [${env.BUILD_NUMBER}]' : check on - (${env.BUILD_URL})")                 
      }
    }
    catch (err) {
        // bitbucketStatusNotify(buildState: 'FAILED')
        //slackSend (color: '#FF0000', message: "FAILED: Build : '${env.JOB_NAME} [${env.BUILD_NUMBER}]' for commit : ${commit_id} : check on - (${env.BUILD_URL})")                 
        throw err
    }                                       
}                                          
