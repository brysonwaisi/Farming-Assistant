variable "account_id" {
  description = "AWS Account ID"
  type        = string
}

variable "cluster_role_arn" {
  description = "AWS IAM Cluster Role ARN "
  type        = string
}

variable "vpc_id" {
  description = "VPC ID"
  type = string
}

variable "cluster_name" {
  default     = "farmingassist"
  type        = string
  description = "AWS EKS Cluster Name"
  nullable    = false
}

variable "private_sub1" {
  description = "Private Subnet ID"
  type = string
}

variable "private_sub2" {
  description = "Private Subnet ID"
  type = string
}

variable "public_sub1" {
  description = "Public Subnet ID"
  type = string
}

variable "public_sub2" {
  description = "Public Subnet ID"
  type = string
}