set -e

runCommand() {
  echo "=== $1 ==="
  $1
  echo ""
}

runCommand "yarn clean"
runCommand "yarn build"
runCommand "yarn pack --filename tiny-toolkit.tgz"
runCommand "cd example"
runCommand "yarn refresh"
runCommand "yarn test"
runCommand "cd -"
