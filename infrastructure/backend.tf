terraform {
  backend "s3" {
    bucket = "farmingassistant"
    key    = "deployment/eks-farming.tfstate"
    region = "us-east-1"
  }
}